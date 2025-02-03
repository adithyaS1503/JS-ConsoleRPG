// import { enemyData } from "./additionalEncounters.js";

/*
Stuff to do: 
1. implement block - done
2. deal with stamina damage - done
3. GuardsMan
4. Block is too good a conter for gnaw, the ranges for gnaw and pounce have to be readjusted.
5. implement specials
6. Completely get rid of the stamina system? It's getting too annoying to deal with.
7. Fix console.logs
*/

/*
Current scope: 
hound 1, after round 3 or 3 howls, hound 2. No multiple characters, enemies or bosses. 
*/

//PC stat
let playerHealth = 20;
let playerStamina = 10;
let isBlock = 0;

//nme stat
let feralHoundHealth = 10;
let feralHoundHealth2 = 10;
let grdsmnH = 30;

// enemy stats for the module
let feralHoundHealthealth1 = 10;
let feralHoundHealthealth2 = 10;
let grdHealth = 25;

// Meta
let OPPONENTS_QUEUE = 1; // ++ when any other enemy spawns
let ROUNDS = 0;
let SUMMON_GUARD = 0;

let isHound1Active = 1;
let isHound2Active = 0;

function userPrompt(){
    let userInput = prompt("Choose: \n\t1. Attack \n\t2. Heavy-Attack \n\t3. Block\n\t4. Use an Inventory-Item\n\t5. Forego Round");
    switch(parseInt(userInput)){
        case 1: case 2: case 3:
            actionRoll(userInput);
            break;
        case 4:
            let spclMove = prompt("WIP\n");
            console.log("Chosen special:",spclMove)
        default:
            console.log("idk");
    }
}


var nmeQ = [];



const enemyData = {
    gnaw: 15,
    pounce: 5, // Pounce used to be 10. OP. Then 5, also OP.
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
        console.log("Block: ",isBlock);
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
                playerStamina -= enemyActOut;
                console.log("Your STAMINA is now:", playerStamina);
            
            } else{

                enemyActOut = this.pounce * this.enemyAtk; 
                playerStamina -= enemyActOut;
                if(playerStamina <= 0)
                {
                    enemyActOut=0;
                    console.log("You have no STAMINA left, the Feral Hound knocks you down.");           
                }else{
                console.log("Feral Hound used POUNCE to deal STAMINA DAMAGE:", enemyActOut);
                console.log("Your STAMINA is now:", playerStamina);
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
                playerHealth -= enemyActOut;
                console.log("Your HEALTH is now:", playerHealth);
            } else{
                let enemyActOut = this.gnaw * this.enemyAtk;
                console.log("Feral Hound used GNAW to deal HEALTH DAMAGE:", enemyActOut);
                playerHealth -= enemyActOut;
                console.log("Your HEALTH is now:", playerHealth);
            }
        } else {
            this.howl();  
        }
    },
    hound2: function fhAttack2(){
        console.log("Block: ",isBlock);
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
                playerStamina -= enemyActOut;
                console.log("Your STAMINA is now:", playerStamina);
            
            } else{

                enemyActOut = this.pounce * this.enemyAtk; 
                playerStamina -= enemyActOut;
                if(playerStamina <= 0)
                {
                    enemyActOut=0;
                    console.log("You have no STAMINA left, the Feral Hound knocks you down.");           
                }else{
                console.log("Feral Hound used POUNCE to deal STAMINA DAMAGE:", enemyActOut);
                console.log("Your STAMINA is now:", playerStamina);
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
                playerHealth -= enemyActOut;
                console.log("Your HEALTH is now:", playerHealth);
            } else{
                let enemyActOut = this.gnaw * this.enemyAtk;
                console.log("Feral Hound used GNAW to deal HEALTH DAMAGE:", enemyActOut);
                playerHealth -= enemyActOut;
                console.log("Your HEALTH is now:", playerHealth);
            }
        } else {
            this.howl();  
        }
    }
};


const guardsMan = {
    attack: 10,
    block: 5,
    isAttacking: function guardAttack(){

    } 
};


// Queues 
// GuardsMan only spawns when howl > 5 or 7. Otherwise, skipped.
// Second Hound always appears after round 3.

/*
array nmeQ will contain the ordered turn of the nmes. check occurs each round or a flag to check if that nme is still active, 
if not, then we pop it from the queue
*/


while(playerHealth>0){
    if(ROUNDS==0){
        console.log("COMMENCE BATTLE");
    } else if(ROUNDS>0){
        console.log("\nNEW ROUND. ROUND number: ",ROUNDS);
        console.log("Your STATS are now: H:",playerHealth," S:",playerStamina);
    }

    userPrompt();

    if(feralHoundHealth!=0){
        console.log("Feral Hound STATS: H:",feralHoundHealth," Howls:",SUMMON_GUARD);
        enemyData.hound1(); 
    }
    // else{
    //     OPPONENTS_QUEUE--;
    // }

    // Second Hound activation
    if(ROUNDS>3 && isHound2Active==1){
        enemyData.hound2();
    }
   
    if (playerHealth <= 0) {
        console.log("You have died.");
        break;
    }

    console.log("\nEND OF ROUND");
    isBlock = 0;
    ROUNDS++;
   
    // if (OPPONENTS_QUEUE <= 0) {
    //     console.log("You have defeated all enemies! Victory!");
    //     break;
    // }
}


function actionRoll(userInput){
    let actionOut = 0;

    // checking what the user input was
    if(userInput==1){
        console.log("You used ATTTACK:10dmg");        
        userInput = 10;
        if(playerStamina>=3){
            userInput -= 2;
        } else if(playerStamina<=0){
            userInput = 0;
        }

        let actBase = Math.random()
        console.log("Your RNG bw 0-1:",actBase)
        act = parseFloat(actBase.toFixed(1))
        console.log("You rolled:",act)
        actionOut = userInput * act;

        console.log("Your attack output:",actionOut);
        feralHoundHealth -= actionOut;
        console.log("Feral Hound health is:",feralHoundHealth);
        if(feralHoundHealth <= 0){
            alert("You have killed Feral Hound.");
        }   
        
    } else if(userInput==2){
        console.log("You used HEAVY-ATTACK:15dmg");
        userInput = 15;
        playerStamina -= 2;


        let actBase = Math.random()
        console.log("Your RNG bw 0-1:",actBase)
        act = parseFloat(actBase.toFixed(1))
        console.log("You rolled:",act)
        actionOut = userInput * act;


        console.log("Your attack output:",actionOut);
        feralHoundHealth -= actionOut;
        console.log("Feral Hound health is:",feralHoundHealth);
        if(feralHoundHealth <= 0){
            console.log("\nDEAD\n");
            alert("You have killed Feral Hound.");
            feralHoundHealth = 0;
            OPPONENTS_QUEUE--;
        }

    } else{
        console.log("You used BLOCK:-10dmg");
        isBlock++;
    }

    // let actBase = Math.random()
    // console.log("Your RNG bw 0-1:",actBase)
    // act = parseFloat(actBase.toFixed(1))
    // console.log("You rolled:",act)
    // actionOut = userInput * act;
    
    

    // console.log("Your attack output:",actionOut);
    // feralHoundHealth -= actionOut;
    // console.log("Feral Hound health is:",feralHoundHealth);
    // if(feralHoundHealth <= 0){
    //     alert("You have killed Feral Hound.");
    // }

    // if(isBlock!=0){
    //     console.log("Your block/damage negation is:",actionOut);
    //     BLOCK += userInput;
    // } else{
    //     console.log("Your attack output:",actionOut);
    //     feralHoundHealth -= actionOut;
    //     console.log("Feral Hound health is:",feralHoundHealth);
    //     if(feralHoundHealth <= 0){
    //         alert("You have killed Feral Hound.");
    //     }
    // }
}



