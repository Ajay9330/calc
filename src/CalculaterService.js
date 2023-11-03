// CalculatorService.js
class CalculatorService {
    constructor() {
      this.display = '0';
      this.input = "";
      this.result = "";
    }
  
    handleButtonClick(value) {
        // alert(this.input+":"+this.display+":"+this.result);
      if (value === 'C') {
        this.clear();
        return;
      } else if (value === '=' || value === 'Enter') {
        this.calculate();
        return;
      } else if (!isNaN(value) || value === '.') {
        this.addToInput(value);
      } else {
        this.addToInput(' ' + value + ' ');
      }
      this.update();
    //   alert(this.input+":"+this.display+":"+this.result);
    }
  
    clear() {
      this.input = '';
      this.display = '0';
      this.result = '';
    }
  
    calculate() {

      try {
        const expression = this.input.replace(' ', '');
        this.result = eval(expression)||0;
        this.display = this.result;
        this.input = this.result.toString();
      } catch (error) {
        this.display = 'Error';
        this.input = '';
      }
    }
  
    update(){
        try {
            const expression = this.input.replace(' ', '');
            this.result = eval(expression) ||0;
            // this.display = this.result;
            // this.input = this.result.toString();
          } catch (error) {
            // this.display = 'Error';
            // this.input = '';
          }
    }
    addToInput(value) {
      this.input += value;
      this.display = this.input;
    }
  
    getCurrentAnswer() {
      return this.result === '' ? '' : 'Ans: ' + this.result;
    }
  }
  
  export default CalculatorService;
  