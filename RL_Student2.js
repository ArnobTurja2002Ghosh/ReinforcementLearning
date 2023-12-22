///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////
//
//  Assignment       COMP3200 - Assignment 5
//  Professor:       David Churchill
//  Year / Term:     2023-09
//  File Name:       RL_Student.js
// 
//  Student Name:    Arnob Ghosh
//  Student User:    arnobg
//  Student Email:   arnobg@mun.ca
//  Student ID:      202136073
//  Group Member(s): [enter student name(s)]
//
///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////

// RL_Student.js 
// Computer Science 3200 - Assignment 5
// Author(s): David Churchill [replace with your name(s)]
//
// All of your Assignment code should be in this file, it is the only file submitted.
// You may create additional functions / member variables within this class, but do not
// rename any of the existing variables or function names, since they are used by the
// GUI to perform specific functions.
//
// IMPORTANT: computed actions are represented by an integer
//            this integer is the index into the this.env.getActions() array
//            wherever we pass an action in this class, use the integer index
//
// NOTE: "Terminal" states do not actually 'terminate' an episode, they simply
//       teleport the agent to a random non-blocked tile on the map.
//       This is because we are working with a continuing task, so technically
//       none of the states are terminal. 
//
// TIP: Complete the assignment in the order of the steps listed in learningIteration()
       
class RL_SARSA {

    constructor(env, config) {
        this.config = config;   // learning configuration settings (alpha, gamma, epsilon)
                                // this.config.alpha   = learning rate
                                // this.config.gamma   = discount factor
                                // this.config.epsilon = e-greedy chance to select random action

        this.env = env;         // the environment we will learn about
            
        this.Q = [];            // values array Q[x][y][a] =       value of doing action a at state (x,y)
        this.P = [];            // policy array P[x][y][a] = probability of doing action a at state (x,y)
        
        
        this.state = [0, 0];    // the current location (state) of the agent on the map
        this.init();
        this.a = this.selectActionFromPolicy(this.state);

        this.type = 'SARSA';
    }
    
    init() {
        // initialize all Q values to 0
        for (let x=0; x<this.env.width; x++) {
            this.Q.push([]);
            for (let y=0; y<this.env.height; y++) {
                this.Q[x].push([]);
                for (let a=0; a<this.env.actions.length; a++) {
                    this.Q[x][y].push(0);
                }
            }
        }

        // initialize Policy to equiprobable actions
        for (let x=0; x<this.env.width; x++) {
            this.P.push([]);
            for (let y=0; y<this.env.height; y++) {
                this.P[x].push([]);
                for (let a=0; a<this.env.actions.length; a++) {
                    this.P[x][y].push(1.0 / this.env.actions.length);
                }
            }
        }
    }
    
    // Student TODO: Implement this function
    //
    // This function performs one iteration of Q-Learning
    //
    // Args:
    //    none
    //
    // Returns:
    //    none
    //
    learningIteration() {
        while(this.env.isTerminal(this.state[0], this.state[1])||this.env.isBlocked(this.state[0], this.state[1])){
            this.state = [Math.floor(Math.random()*this.env.width), Math.floor(Math.random()*this.env.height)];
            this.a = this.selectActionFromPolicy(this.state);
            console.log("Random state is", this.state);
        }
        
        console.log("From", this.state, "I am taking", this.a);
        let nextState = this.env.getNextState(this.state[0], this.state[1], this.a);
        let R = this.env.getReward(nextState[0], nextState[1]);
        
        this.updateValue(this.state, this.a, R, nextState);
        // 6. update the current policy at this.state                           this.updatePolicy
        this.updatePolicy(this.state);
        // 7. set this.state equal to the next state (calculated in step 4)
        this.state=nextState;
    }

    
    selectActionFromPolicy(state) {

        let actionIndex;
        console.log("hi");
        if(Math.random()<this.config.epsilon){
            actionIndex = Math.floor(this.env.actions.length*Math.random());
            console.log(actionIndex, "is a random action from", state);
        }
        else{
            actionIndex = this.Q[state[0]][state[1]].indexOf(Math.max(...this.Q[state[0]][state[1]]));
            console.log(actionIndex, "is a greedy action from", state);
        }
        return actionIndex;
    }
       
    
    updateValue(state, action, reward, nextState) {
        let nextAction = this.selectActionFromPolicy(nextState);
        console.log("I will take", nextAction, "when I reach", nextState, "I promise");
        this.Q[state[0]][state[1]][action] = this.Q[state[0]][state[1]][action] + this.config.alpha*(reward+this.config.gamma * this.Q[nextState[0]][nextState[1]][nextAction]- this.Q[state[0]][state[1]][action]);
        // implement Q-Learning update function
        this.a = nextAction;
    }

    
    updatePolicy(state)
    {
        console.log("Areh hi");
        console.log(this.Q[state[0]][state[1]]);
        let maxActionValue=Math.max(...this.Q[state[0]][state[1]]);
        let maxActions=[];
        for(let i=0; i<this.Q[state[0]][state[1]].length; i++){
            if(this.Q[state[0]][state[1]][i].toFixed(3) == maxActionValue.toFixed(3)){
                maxActions.push(i);
            }
        }
        for(let i=0; i<this.P[state[0]][state[1]].length; i++){
            if(maxActions.includes(i)){
                this.P[state[0]][state[1]][i] = 1.0/maxActions.length;
            }
            else{
                this.P[state[0]][state[1]][i] = 0;
            }
        }
        console.log(this.P[state[0]][state[1]]);
    }

    
       

    
    // used by GUI, do not modify
    getMinQ() {
        let min = 10000000;
        for (let x=0; x<this.env.width; x++) {
            for (let y=0; y<this.env.height; y++) {
                for (let a=0; a<this.env.actions.length; a++) {
                    if (this.env.getType(x, y) == 'C' && this.Q[x][y][a] < min) { min = this.Q[x][y][a]; }
                }
            }
        }
        return min;
    }

    // used by GUI
    getMaxQ() {
        let max = -10000000;
        for (let x=0; x<this.env.width; x++) {
            for (let y=0; y<this.env.height; y++) {
                for (let a=0; a<this.env.actions.length; a++) {
                    if (this.env.getType(x, y) == 'C' && this.Q[x][y][a] > max) { max = this.Q[x][y][a]; }
                }
            }
        }
        return max;
    }
}

// Copyright (C) David Churchill - All Rights Reserved
// COMP3200 - 2023-09 - Assignment 5
// Written by David Churchill (dave.churchill@gmail.com)
// Unauthorized copying of these files are strictly prohibited
// Distributed only for course work at Memorial University
// If you see this file online please contact email above
