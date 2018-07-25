import Visualization from 'zeppelin-vis'
import PassthroughTransformation from 'zeppelin-tabledata/passthrough'
import { VennDiagram } from 'venn.js'

export default class ZeppelinHeliumD3Venn extends Visualization {

  constructor(targetEl, config) {
    super(targetEl, config)

    this.transformation = new PassthroughTransformation(config)

    this.vennChart = new VennDiagram()
  }

  render(tableData) {
  	function transformTableDataToVennSetsData(){
  		var nameIndex = 0
  		var valueIndex = 1
  		var arrayLength = tableData.rows.length;

  		var ret = []
  		var ii
  		for(ii = 0; ii < arrayLength; ii++) {
  			var sets = tableData.rows[ii][nameIndex].split(/\s+u(?:nion)?\s+/)
  			ret.push({ sets: sets, size: tableData.rows[ii][valueIndex]})
  		}

  		return ret
  	}

  	var vennSets = transformTableDataToVennSetsData()
		d3.select(this.targetEl[0]).datum(vennSets).call(this.vennChart)
  }

  getTransformation() {
    return this.transformation
  }

}
