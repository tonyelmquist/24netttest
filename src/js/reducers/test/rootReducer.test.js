import reducer from '../rootReducer';
import Actions from '../../constants/ReduxConstants';

describe('currency reducer', () => {


  const testState = {   
        currencies: [{"baseCurrency": "USD", "quoteCurrency": "NOK", "rate": "7.75", "selected": false, "timePeriod": "2017"}, {"baseCurrency": "NOK", "quoteCurrency": "NOK", "rate": "7.75", "selected": false, "timePeriod": "2017"}]     
    }
    const testStateWithSelection = {   
        currencies: [{"baseCurrency": "USD", "quoteCurrency": "NOK", "rate": "7.75", "selected": true, "timePeriod": "2017"}, {"baseCurrency": "NOK", "quoteCurrency": "NOK", "rate": "7.75", "selected": false, "timePeriod": "2017"}]     
    }


  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        currencies: []
      }
    )
  })


 it('should handle SET_CURRENCIES', () => {
    expect(
      reducer([], {
        type: Actions.SET_CURRENCIES,
        currencyData: `<message:StructureSpecificData xmlns:ss="http://www.sdmx.org/resources/sdmxml/schemas/v2_1/data/structurespecific" xmlns:footer="http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message/footer" xmlns:ns1="urn:sdmx:org.sdmx.infomodel.datastructure.Dataflow=NB:EXR(1.0):ObsLevelDim:TIME_PERIOD" xmlns:message="http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message" xmlns:common="http://www.sdmx.org/resources/sdmxml/schemas/v2_1/common" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message https://registry.sdmx.org/schemas/v2_1/SDMXMessage.xsd urn:sdmx:org.sdmx.infomodel.datastructure.Dataflow=NB:EXR(1.0):ObsLevelDim:TIME_PERIOD https://data.norges-bank.no/api/schema/dataflow/NB/EXR/1.0?format=sdmx-2.1">
<message:Header>
<message:ID>a0b824666267ae8eea15fc458b171d57</message:ID>
</message:Header>
<message:DataSet ss:dataScope="DataStructure" xsi:type="ns1:DataSetType" ss:structureRef="NB_EXR_1_0">
<Series FREQ="A" BASE_CUR="USD" QUOTE_CUR="NOK" TENOR="SP" DECIMALS="4" CALCULATED="false" UNIT_MULT="0" COLLECTION="A">
<Obs TIME_PERIOD="2017" OBS_VALUE="7.75"/>
</Series>
<Series FREQ="A" BASE_CUR="NOK" QUOTE_CUR="NOK" TENOR="SP" DECIMALS="4" CALCULATED="false" UNIT_MULT="0" COLLECTION="A">
<Obs TIME_PERIOD="2017" OBS_VALUE="7.75"/>
</Series>
</message:DataSet>
</message:StructureSpecificData>`
      })
    ).toEqual(testState)
});

 it('should handle SELECT_CURRENCY', () => {
    expect(
      reducer(testState, {
        type: Actions.SELECT_CURRENCY,
        currencyName: 'USD'
      })
    ).toEqual(testStateWithSelection)
});

 it('should handle DESELECT_CURRENCY', () => {
    expect(
      reducer(testStateWithSelection, {
        type: Actions.DESELECT_CURRENCY,
        currencyName: 'USD'
      })
    ).toEqual(testState)
});

});

