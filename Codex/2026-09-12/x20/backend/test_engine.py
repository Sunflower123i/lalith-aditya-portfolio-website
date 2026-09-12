from main import Rx, checks
def test_ddi_disease(): assert {'drug-drug interaction','drug-disease interaction'} <= {x['risk_type'] for x in checks(Rx(drug='ibuprofen',dose_mg=400,frequency='three times daily'))}
def test_allergy(): assert 'allergy conflict' in {x['risk_type'] for x in checks(Rx(drug='amoxicillin',dose_mg=500))}
def test_dup_dose(): assert {'therapeutic duplication','dosage'} <= {x['risk_type'] for x in checks(Rx(drug='lisinopril',dose_mg=80))}
