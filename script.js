//Author: Henil Shah

//Table operations with multiple security levels

function tableOperations() {
	//Data of Table-1 with 3 security levels
	this.table1 = document.getElementById("feature_table_1");
	this.checkboxes1 = this.table1.querySelectorAll('[type="checkbox"]');
	this.rows1 = this.table1.rows;
	this.report1 = {};
	
	//Data of Table-2 with 10 security levels 
	this.table2 = document.getElementById("feature_table_2");
	this.checkboxes2 = this.table2.querySelectorAll('[type="checkbox"]');
	this.rows2 = this.table2.rows;
	this.report2 = {};
	
}

/* perform the following operations with checkboxes
** When a checkbox in a row becomes checked, it must check the checkboxes to the right of itself.
** When a checkbox in a row becomes unchecked, it must uncheck the checkboxes to the left of itself.
** @param {obj} rows 
** @param {obj} checkboxes
*/
tableOperations.prototype.checkBoxActivity = function(rows, checkboxes, tableIdx) {
	var current = 0, col; 
	
	for(var i = 0; i < rows.length; i++) {
		col = rows[i].cells;
		for(var j = 1; j < col.length; j++) {
			if (i>0) {
				var self = this;
				checkboxes[current].onchange = (function(current,i,j) {
					if(checkboxes[current]) {
						return	function() {
							var cellIndex = j;
							if (checkboxes[current].checked) {
								
								tableIdx === 1 ? self.report1[current] = [i,j] : self.report2[current] = [i,j];
								
								var incr = 0;
								//check all the boxes on the right of checked one
								while(cellIndex < col.length - 1) {
									
									incr++;
									cellIndex++;
									checkboxes[current+incr].checked = true;
									
									//use the value of i and j to report exiting checked boxes in the table
									tableIdx === 1 ? self.report1[current+incr] = [i,j+incr] : self.report2[current+incr] = [i,j+incr];
								}
								
							} else {
								var decr = 0;
								//uncheck all the boxes on the left of checked one
								while(cellIndex > 1) {
									decr++;
									cellIndex--;
									checkboxes[current-decr].checked = false;
									//remove when unchecked
									tableIdx === 1 ? self.report1[current] = null : self.report2[current] = null;
									tableIdx === 1 ? self.report1[current-decr] = null : self.report2[current-decr] = null;
								}	
							}
						}
					}	
				})(current,i,j);
				
				//increment the current
				current++;
			}
		}
	}
};

var operation = new tableOperations();

//Checkbox event handler for Table 1
document.getElementById("feature_table_1").addEventListener("click", 
															operation.checkBoxActivity(operation.rows1, operation.checkboxes1, 1));
//handler for and table 2
document.getElementById("feature_table_2").addEventListener("click", 
															operation.checkBoxActivity(operation.rows2, operation.checkboxes2, 2));

/* capture the report when "Report" button clicked and return all 
** the existing checked boxes with their respective positions within the table
*/
document.getElementById("report_btn_1").addEventListener("click", function() {
	console.log ("\n----------Report for Table 1----------------");
	for(var prop in this.report1) {
		if(this.report1[prop]) {
			var index =parseInt(prop) + 1;
			console.log("CheckBox Numer " + index + ", Row: " + this.report1[prop][0] + ", column: " + this.report1[prop][1]);
		}
	}
}.bind(operation));

//Report for Table 2
document.getElementById("report_btn_2").addEventListener("click", function() {
	console.log ("\n----------Report for Table 2----------------");
	for(var prop in this.report2) {
		if(this.report2[prop]) {
			var index =parseInt(prop) + 1;
			console.log("CheckBox Numer " + index + ", Row: " + this.report2[prop][0] + ", column: " + this.report2[prop][1]);
		}
	}
}.bind(operation));
