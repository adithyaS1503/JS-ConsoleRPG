/*
To do: 
loading enemies into an array. If I can't do that, I'll need to just use if-else conditions.
choosing between mulitple enemies when there's more than 1.
transitioning backgrounds, all that stuff
change block to negating 3 stamina and health damage
add notification to say 'I missed...' if attackRoll == 0

all exec attacks deal health + stamina damage, if stamina falls below 

handling the UI: 
character sprites and background will be visible, input is still via prompts. 
Some console.log() stuff will be made into alerts
*/

// HTML stuff
roundCounter = document.getElementById('roundCounter');
areaCounter = document.getElementById('areaCounter');


let isBlock = 0;
let userInput = 0;

// Have to put health and stamina values here otherwise they reset
//Player:
let health = 20;
let stamina = 10; 

//Enemies:
let feralHoundHealth = 10;
let feralHoundHealth2 = 10;
let guardsManhealth = 20;
let executionerHealth = 30;
let scarletKingHealth = 50;

// Meta
let OPPONENTS_QUEUE = 1; // ++ when any other enemy spawns
let ROUNDS = 0;
let SUMMON_GUARD = 0;
let isHound1Active = 1; //always 1, first enemy
let isHound2Active = 0;
let isgmActive = 0;
let isExecBlocking = 0;

let areaCleared = 0; // 1 - defeated hounds and/or guard, 2 - defeated executioner.


// CODE

const enemyData = {
    // FH - basic enemy
    gnaw: 5,
    pounce: 5, 
    // GMan - almost implemented.
    slash: 10,
    pummel: 3, 
    // Exec - only deals stamina damage except for clobber, doubtful of implementing.
    bash: 10,
    crush: 10,
    clobber: 20, // only attack that deals damage.
    // SK - might not implement
    thrust: 10,
    cleave: 15,
    dismantle: 10,
    impale: 20, 
    aTrueDeath: 100, //very improbable, one-hit-kill.
    howl: function() {
        if(SUMMON_GUARD<5){
            SUMMON_GUARD++;
        } 
        console.log("The hound seems to be calling out...");
    },
    attackRoll: function(){
        // Generate random number bw 0-1
        this.enemyAtkMod = Math.random();
        console.log("Enemy RNG:", this.enemyAtkMod);
    
        // Round up the random number
        this.enemyAtk = parseFloat(this.enemyAtkMod.toFixed(1));
        console.log("Enemy rolled:", this.enemyAtk);
    },    
    hound1: function fhAttack1(){
        console.log("\nFeral Hound Turn");
    
        // Call attackRoll() to assign enemyAtkMod and enemyAtk
        this.attackRoll();
    
        if(this.enemyAtkMod >= 0.66){
            if(isBlock!=0){
                let enemyActOut = this.pounce * this.enemyAtk;
                console.log("Before damage negate:",enemyActOut);
                enemyActOut -= 5;
                if(enemyActOut<=0){
                    console.log("Perfect BLOCK!");
                    enemyActOut = 0;
                }
                console.log("Feral Hound used POUNCE to deal STAMINA DAMAGE:", enemyActOut);
                stamina -= enemyActOut;
                console.log("Your STAMINA is now:", stamina);
            
            } else{

                enemyActOut = this.pounce * this.enemyAtk; 
                stamina -= enemyActOut;
                if(stamina <= 0)
                {
                    enemyActOut=0;
                    console.log("You have no STAMINA left, the Feral Hound knocks you down.");           
                }else{
                console.log("Feral Hound used POUNCE to deal STAMINA DAMAGE:", enemyActOut);
                console.log("Your STAMINA is now:", stamina);
                }
            }

        } else if(this.enemyAtkMod >= 0.33) {
            
            if(isBlock!=0){
                let enemyActOut = this.gnaw * this.enemyAtk;
                console.log("Before damage negate:",enemyActOut);
                enemyActOut -= 5;
                if(enemyActOut<=0){
                    console.log("Perfect BLOCK!");
                    enemyActOut = 0;
                }
                console.log("Feral Hound used GNAW to deal HEALTH DAMAGE:", enemyActOut);
                health -= enemyActOut;
                console.log("Your HEALTH is now:", health);
            } else{
                let enemyActOut = this.gnaw * this.enemyAtk;
                console.log("Feral Hound used GNAW to deal HEALTH DAMAGE:", enemyActOut);
                health -= enemyActOut;
                console.log("Your HEALTH is now:", health);
            }
        } else {
            this.howl();  
        }
    },
    hound2: function fhAttack2(){
        console.log("\nFeral Hound 2 Turn");
    
        // Call attackRoll() to assign enemyAtkMod and enemyAtk
        this.attackRoll();
    
        if(this.enemyAtkMod >= 0.66){
            if(isBlock!=0){
                let enemyActOut = this.pounce * this.enemyAtk;
                console.log("Before damage negate:",enemyActOut);
                enemyActOut -= 5;
                if(enemyActOut<=0){
                    console.log("Perfect BLOCK!");
                    enemyActOut = 0;
                }
                console.log("Feral Hound 2 used POUNCE to deal STAMINA DAMAGE:", enemyActOut);
                stamina -= enemyActOut;
                console.log("Your STAMINA is now:", stamina);
            
            } else{

                enemyActOut = this.pounce * this.enemyAtk; 
                stamina -= enemyActOut;
                if(stamina <= 0)
                {
                    enemyActOut=0;
                    console.log("You have no STAMINA left, the Feral Hound 2 knocks you down.");           
                }else{
                console.log("Feral Hound 2 used POUNCE to deal STAMINA DAMAGE:", enemyActOut);
                console.log("Your STAMINA is now:", stamina);
                }
            }

        } else if(this.enemyAtkMod >= 0.33) {
            
            if(isBlock!=0){
                let enemyActOut = this.gnaw * this.enemyAtk;
                console.log("Before damage negate:",enemyActOut);
                enemyActOut -= 5;
                if(enemyActOut<=0){
                    console.log("Perfect BLOCK!");
                    enemyActOut = 0;
                }
                console.log("Feral Hound 2 used GNAW to deal HEALTH DAMAGE:", enemyActOut);
                health -= enemyActOut;
                console.log("Your HEALTH is now:", health);
            } else{
                let enemyActOut = this.gnaw * this.enemyAtk;
                console.log("Feral Hound 2 used GNAW to deal HEALTH DAMAGE:", enemyActOut);
                health -= enemyActOut;
                console.log("Your HEALTH is now:", health);
            }
        } else {
            this.howl();  
        }
    },
    guardsMan: function guardAttack(){
        console.log("GuardsMan turn");
        this.attackRoll();
        if(this.enemyAtkMod >= 0.33){
            if(isBlock!=0){
                let enemyActOut = this.slash * this.enemyAtk;
                console.log("Before damage negate:",enemyActOut);
                enemyActOut -= 5;
                if(enemyActOut<=0){
                    console.log("Perfect BLOCK!");
                    enemyActOut = 0;
                }
                // console.log("GuardsMan used SLASH to deal STAMINA DAMAGE:", enemyActOut);
                console.log(`GuardsMan used SLASH to deal ${enemyActOut} damage`);
                health -= enemyActOut;
                console.log("Your HEALTH is now:", health);
            
            } else{

                enemyActOut = this.slash * this.enemyAtk; 
                health -= enemyActOut;
                console.log(`GuardsMan used SLASH to deal ${enemyActOut} damage`);
                console.log("Your HEALTH is now:", health);
                }
            } else if(this.enemyAtkMod < 0.33){
                if(isBlock!=0){
                    let enemyActOut = this.pummel * this.enemyAtk;
                    console.log("Before damage negate:",enemyActOut);
                    enemyActOut -= 5;
                    if(enemyActOut<=0){
                        console.log("Perfect BLOCK!");
                        enemyActOut = 0;
                    }
                    // console.log("GuardsMan used SLASH to deal STAMINA DAMAGE:", enemyActOut);
                    console.log(`GuardsMan used PUMMEL to deal ${enemyActOut} damage`);
                    stamina -= enemyActOut;
                    console.log("Your STAMINA is now:", stamina);
                
                } else{
    
                    enemyActOut = this.pummel * this.enemyAtk; 
                    stamina -= enemyActOut;
                    console.log(`GuardsMan used PUMMEL to deal ${enemyActOut} damage`);
                    console.log("Your STAMINA is now:", stamina);
                    }
                }
        },
        executioner: function executionerAttack(){
            console.log("Executioner turn"); // first enemy to block. You face it alone.
            this.attackRoll(); 
            // 0-0.2: block, 0.2-0.5: bash(10Sdmg), 0.5-0.99: crush, 1: clobber(20dmg)
            if(this.enemyAtkMod < 0.2){
                isExecBlocking = 1;
            } else if(this.enemyAtkMod < 0.33){
                    if(isBlock!=0){
                        let enemyActOut = this.pummel * this.enemyAtk;
                        console.log("Before damage negate:",enemyActOut);
                        enemyActOut -= 5;
                        if(enemyActOut<=0){
                            console.log("Perfect BLOCK!");
                            enemyActOut = 0;
                        }
                        // console.log("GuardsMan used SLASH to deal STAMINA DAMAGE:", enemyActOut);
                        console.log(`GuardsMan used PUMMEL to deal ${enemyActOut} damage`);
                        stamina -= enemyActOut;
                        console.log("Your STAMINA is now:", stamina);
                    
                    } else{
        
                        enemyActOut = this.pummel * this.enemyAtk; 
                        stamina -= enemyActOut;
                        console.log(`GuardsMan used PUMMEL to deal ${enemyActOut} damage`);
                        console.log("Your STAMINA is now:", stamina);
                        }
                    }   
        }
};


// Need to figure out how this works for multiple enemies
const queueMgmt = {
    execEle: function(){
        console.log(`Array is: ${nmeQ}`);
        var nmeQ = [enemyData.hound1(), enemyData.hound2()];
    },
    addEle: function(){
        this.nmeQ.push();
    },
    removeEle: function(){
        this.nmeQ.pop();
    }
};



const playerDat = {
    attack: 10,
    hAttack: 15,
    determineAction: function(){
        if(userInput==1){
            console.log("You used ATTTACK: 0-10dmg");        
            userInput = this.attack;
            this.playerRoll(userInput);
        } else if(userInput==2){
            console.log("You used HEAVY-ATTACK: 0-15dmg");
            userInput = this.hAttack;
            this.playerRoll(userInput);
        } else if(userInput==3) {
            console.log("You used BLOCK. You can negate 5 damage");
            isBlock++;
        } else{
            console.log("Foregoing Round...");
        }
        
        // this.playerRoll(userInput);
    },
    playerRoll: function(userInput){
        // RNG bw 0-1
        let roll = Math.random();
        console.log("Your RNG bw 0-1:",roll);
        // converting something like 2.89279 to 3
        let modifier = parseFloat(roll.toFixed(1));
        console.log("Your modifier:",modifier);
        attackValue = userInput * modifier;
        console.log("Your output:",attackValue);
        // this.playerAttack(attackValue);
        // this.chooseTarget(attackValue);
        this.targetselector(attackValue);
    },
    playerAttack: function(attackValue){
        // Actual damage happens here:
        if ((feralHoundHealth - attackValue) <= 0){
            feralHoundHealth = 0;
            isHound1Active = 0;
            console.log("Feral Hound Slain!");
        } else{
            feralHoundHealth -= attackValue;
            console.log(`Feral Hound health is now: ${feralHoundHealth}`);
            // alert(`Feral Hound health is now: ${feralHoundHealth}`);
        }
    },
    playerAttackHound2: function(attackValue){
        if ((feralHoundHealth2 - attackValue) <= 0){
            feralHoundHealth2= 0;
            isHound2Active = -1;
            console.log("Feral Hound 2 Slain!");
        } else{
            feralHoundHealth2 -= attackValue;
            console.log(`Feral Hound 2 health is now: ${feralHoundHealth2}`);
        }
    },
    playerAttackGuard: function(attackValue){
        if ((guardsManhealth - attackValue) <= 0){
            guardsManhealth= 0;
            isgmActive = -1;
            console.log("GuardsMan Slain");
        } else{
            guardsManhealth -= attackValue;
            console.log(`GuardsMan health is now: ${guardsManhealth}`);
        }
    },
    // I fucking hate this so much. I should've just ran this whole thing is one massive if-else if 
    /*
    Remember: 
        Area == 0: Hounds and Guardsman
        Area == 1: Exec
        Area == 2: Boss
    */
    targetselector: function(attackValue){
        if((SUMMON_GUARD<5) && (areaCleared == 0)){
            if((feralHoundHealth != 0) && (isHound2Active == 0)){
                // only Hound 1
                this.playerAttack(attackValue);
            } else if((feralHoundHealth == 0) && (isHound2Active == 1)){
                // only Hound 2
                this.playerAttackHound2(attackValue);
            } else if((feralHoundHealth != 0) && (isHound2Active == 1)){
                // Choose bw Hound 1 and 2
                target = parseInt(prompt(`Choose creature to attack:\n\t1. Feral Hound 1\n\t2. Feral Hound 2\n`));
                if(target == 1){
                    this.playerAttack(attackValue);
                } else if(target ==2 ){
                    this.playerAttackHound2(attackValue);
                }
            }
        } else if((SUMMON_GUARD >= 5) && (areaCleared == 0)){
            if(isgmActive == 1){
                if(((feralHoundHealth != 0) && (isHound2Active == 1))){
                    target = parseInt(prompt(`Choose creature to attack:\n\t1. Feral Hound 1\n\t2. Feral Hound 2\n\t3. GuardsMan\n`));
                    if(target == 1){
                        this.playerAttack(attackValue);
                    } else if(target ==2 ){
                        this.playerAttackHound2(attackValue);
                    } else{
                        this.playerAttackGuard(attackValue);
                    }
                }else if((feralHoundHealth != 0) && (isHound2Active != 1)){
                    target = parseInt(prompt(`Choose creature to attack:\n\t1. Feral Hound 1\n\t2. GuardsMan\n`));
                    if(target == 1){
                        this.playerAttack(attackValue);
                    } else if(target ==2 ){
                        this.playerAttackGuard(attackValue);
                    } 
                }else if((isHound2Active == 1) && (feralHoundHealth == 0)){
                    target = parseInt(prompt(`Choose creature to attack:\n\t1. Feral Hound 2\n\t2. GuardsMan\n`));
                    if(target == 1){
                        this.playerAttackHound2(attackValue);
                    } else if(target ==2 ){
                        this.playerAttackGuard(attackValue);
                    } 
                }
            }
        }
    }
};


// global scope
while(health > 0){
    if(ROUNDS == 0){
        console.log("COMMENCE BATTLE");
        console.log(`Your HEALTH is ${health} and STAMINA is ${stamina}`);
    } else if(ROUNDS>0){
        console.log(`\nROUND ${ROUNDS}`);
        stamina = 10;
        console.log(`Your current stats: \nHEALTH is ${health} \nSTAMINA is ${stamina}`);
        
        // buffs after clearing an area:
        // while(areaCleared==1){
        //     if((feralHoundHealth2 == 0) && (guardsManhealth == 0)){
        //         // Once player gets GuardsMan's Sword 
        //         playerDat.attack = 15;
        //         playerDat.hAttack = 20;
        //         // general stats buff
        //         health = 25;
        //         stamina = 15;
        //     } else if((feralHoundHealth2==0) && (isgmActive == 0)){
        //         // stats buff only
        //         health += 25;
        //         stamina += 15;
        //     }
        // }
    }
    
    userInput = parseInt(prompt("Choose: \n\t1. Attack \n\t2. Heavy-Attack \n\t3. Block\n\t4. Forego Round"));
    playerDat.determineAction(userInput);
    // handle choosing target here? 

    isExecBlocking = 0;

    // Checking to see if enemy is active
    if(feralHoundHealth > 0){
        enemyData.hound1(); 
        console.log(`Feral Hound stats:\nHealth: ${feralHoundHealth}\nHowls: ${SUMMON_GUARD}`);
    } else{
        // console.log("Feral Hound Slain");
        feralHoundHealth = 0;
        if(((isHound2Active)==0) && (feralHoundHealth2 != 0)){
            ROUNDS = 3;
        }
        // break;
    }

    if(ROUNDS >= 3){
        if(isHound2Active == 0){
            OPPONENTS_QUEUE++;
            isHound2Active++;
            console.log("Another Feral Hound has joined the battle!");
        } else{
            if(feralHoundHealth2 > 0){
                enemyData.hound2();
                console.log(`Feral Hound 2 stats:\nHealth: ${feralHoundHealth2}\nTotal Howls: ${SUMMON_GUARD}`);
            } else{
                // console.log("Feral Hound 2 Slain");
                isHound2Active = -1;
                OPPONENTS_QUEUE--;
                // break;
            }
        } 
    }

    // Can be completely bypassed if you kill the feral hounds quickly.
    if (SUMMON_GUARD >= 5){
        if(isgmActive == 0){
            OPPONENTS_QUEUE++;
            isgmActive++;
            console.log("The GuardsMan has joined the battle!");
        } else{
            if(guardsManhealth > 0){
                enemyData.guardsMan();
                console.log(`GuardsMan stats:\nHealth: ${guardsManhealth}`);
            } else{
                // console.log("GuardsMan Slain");
                isgmActive = -1;
                OPPONENTS_QUEUE--;
                // break;
            }
        } 
    }

    if((guardsManhealth == 0) && (feralHoundHealth2 == 0)){
        areaCleared++;
    } else if((feralHoundHealth2 == 0) && (isgmActive == 0)){
        areaCleared++;
    } 

    // clear out the current bg and sprites using DOM manipulation
    // if(areaCleared == 1){
       
    // }

    if(ROUNDS >= 50){
        alert("The Forlorn King has succeeded in his ritual, all hope is lost.");
        break;
    }
    // Always after all enemy attacks.
    if (stamina <= 3){
        console.log("I'm exhausted...");
    }
    
    if (health <= 0) {
        console.log("You have died.");
        break;
    }

    console.log("\nEND OF ROUND");

    isBlock = 0;
    ROUNDS++;

    if(ROUNDS >= 50){
        console.log("\n===\nYou have failed in your mission, the ritual is complete and the world is shrouded in an all-consuming fog.\n===\n");
        break;
    }
}