class CoffeeMaker{
    constructor(){
        this.state = 'init';
        this.leftMilk = '500ml';

    }
    stateToProcessor={
        that: this,
        american(){},
        latte(){},
        vanillaLatte(){},
        mocha(){}
    }
    changeState(state){
        this.state = state;
        this.stateToProcessor[state]();
    }
}
const mk = new CoffeeMaker();
mk.changeState('latte');