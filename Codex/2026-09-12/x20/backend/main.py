"""RxSentry prototype: safety conclusions come only from editable deterministic rules."""
import json
from datetime import datetime, timezone
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

R=json.loads((Path(__file__).parent/'data/rules.json').read_text()); AUDIT=[]
PATIENT={"id":"pt-001","name":"Maya Chen","initials":"MC","age":72,"weight_kg":58,"egfr":42,"diagnoses":["GI bleed","Hypertension"],"allergies":[{"name":"Penicillin","reaction":"Anaphylaxis"}],"medications":[{"drug":"Warfarin","dose_mg":5,"frequency":"daily","started":"2024-03-11"},{"drug":"Lisinopril","dose_mg":20,"frequency":"daily","started":"2023-10-02"},{"drug":"Naproxen","dose_mg":220,"frequency":"twice daily","started":"2026-09-02"}]}
class Rx(BaseModel): drug:str; dose_mg:float=Field(gt=0); frequency:str='daily'; route:str='Oral'; duration_days:int=7
class Request(BaseModel): patient_id:str='pt-001'; prescription:Rx
class Override(BaseModel): alert_id:str; justification:str=Field(min_length=4); clinician:str='Dr. Avery Patel'
def n(x): return R['aliases'].get(x.strip().lower(),x.strip().lower())
def make(kind,severity,drugs,rule,context=''):
 return {"id":f"{kind[:3]}-{len(AUDIT)}-{n('-'.join(drugs))}","risk_type":kind,"severity":severity,"drugs_involved":drugs,"summary":f"{' + '.join(drugs)}: {severity.lower()} {kind} risk","mechanism":rule['mechanism'],"clinical_effect":rule['effect'],"recommended_action":rule['action'],"evidence_source":rule['source'],"patient_context":context}
def checks(rx):
 drug=n(rx.drug); meds=[n(m['drug']) for m in PATIENT['medications']]; out=[]
 for rule in R['ddi']:
  if drug in rule['drugs'] and any(x in meds for x in rule['drugs'] if x!=drug): out.append(make('drug-drug interaction',rule['severity'],[rx.drug.title(),next(x for x in rule['drugs'] if x!=drug).title()],rule,'History of GI bleed further increases harm.' if drug=='ibuprofen' else ''))
 for rule in R['disease']:
  if drug==rule['drug'] and rule['condition'] in ' '.join(PATIENT['diagnoses']).lower(): out.append(make('drug-disease interaction',rule['severity'],[rx.drug.title()],rule,f"Active diagnosis: {rule['condition']}."))
 for allergy in PATIENT['allergies']:
  if drug in R['allergies'].get(allergy['name'].lower(),[]): out.append(make('allergy conflict','Contraindicated',[rx.drug.title(),allergy['name']],{"mechanism":"Prescribed medication is in the documented allergen class.","effect":f"Severe hypersensitivity ({allergy['reaction']}).","action":"Do not dispense; choose a non-cross-reactive alternative.","source":"Curated cross-reactivity rule ALG-001"},f"Documented {allergy['reaction']} to {allergy['name']}."))
 cl=R['classes'].get(drug)
 if cl and any(R['classes'].get(x)==cl for x in meds): out.append(make('therapeutic duplication','Moderate',[rx.drug.title(),next(x for x in meds if R['classes'].get(x)==cl).title()],{"mechanism":f"Both medications are {cl}s.","effect":"Additive adverse effects without documented rationale.","action":"Confirm intent; discontinue or document a justified dual regimen.","source":"Curated class rule DUP-001"}))
 times=3 if 'three' in rx.frequency else 2 if 'twice' in rx.frequency else 1
 if drug in R['max_daily_mg'] and rx.dose_mg*times>R['max_daily_mg'][drug]: out.append(make('dosage','Major',[rx.drug.title()],{"mechanism":f"Daily dose {rx.dose_mg*times:g} mg exceeds configured maximum {R['max_daily_mg'][drug]} mg.","effect":"Dose-related toxicity.","action":"Reassess dose and frequency before prescribing.","source":"Curated dosage rule DOS-001"},f"Computed from {rx.dose_mg:g} mg {rx.frequency}."))
 order={'Contraindicated':4,'Major':3,'Moderate':2,'Minor':1};return sorted(out,key=lambda x:-order[x['severity']])
app=FastAPI(title='RxSentry Safety API');app.add_middleware(CORSMiddleware,allow_origins=['http://127.0.0.1:5173'],allow_methods=['*'],allow_headers=['*'])
@app.get('/patients')
def patients(): return [PATIENT]
@app.get('/patients/{patient_id}')
def patient(patient_id:str):
 if patient_id!=PATIENT['id']: raise HTTPException(404,'Patient not found')
 return PATIENT
@app.post('/check-safety')
def safety(body:Request):
 if body.patient_id!=PATIENT['id']: raise HTTPException(404,'Patient not found')
 alerts=checks(body.prescription); AUDIT.insert(0,{"id":f"chk-{len(AUDIT)+1}","timestamp":datetime.now(timezone.utc).isoformat(),"action":"Safety check completed","clinician":"Dr. Avery Patel","prescription":body.prescription.model_dump(),"alerts":alerts})
 return {"alerts":alerts,"checks":["drug-drug interactions","drug-disease interactions","therapeutic duplication","dosage","allergies"]}
@app.post('/alerts/override')
def override(body:Override):
 event={"id":f"ovr-{len(AUDIT)+1}","timestamp":datetime.now(timezone.utc).isoformat(),"action":"Alert overridden","clinician":body.clinician,"justification":body.justification,"alert_id":body.alert_id};AUDIT.insert(0,event);return event
@app.get('/audit')
def audit(): return AUDIT
