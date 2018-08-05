import Visualization from 'zeppelin-vis'
import PassthroughTransformation from 'zeppelin-tabledata/passthrough'
import { VennDiagram } from 'venn.js'

export default class ZeppelinHeliumD3Venn extends Visualization {

  constructor(targetEl, config) {
    super(targetEl, config)

    this.transformation = new PassthroughTransformation(config)
  }

  createVennChart(width, height) {
  	return new VennDiagram().
  	    width(width).
  	    height(height);
  }

  render(tableData) {
    debugger;

  	function transformTableDataToVennSetsData(){
  		var nameIndex = 0
  		var valueIndex = 1
  		var arrayLength = tableData.rows.length;

  		var ret = []
  		var ii
  		for(ii = 0; ii < arrayLength; ii++) {
  			var sets = tableData.rows[ii][nameIndex].split(/\s+(?:(?:i(?:ntersect)?)|\u2229)\s+/)
  			ret.push({ sets: sets, size: tableData.rows[ii][valueIndex]})
  		}

  		return ret
  	}

  	var vennSets = transformTableDataToVennSetsData()
		d3.select(this.targetEl[0]).datum(vennSets).call(
			  this.createVennChart($(this.targetEl).width(), $(this.targetEl).height()));
  }

  getTransformation() {
    return this.transformation
  }

}
