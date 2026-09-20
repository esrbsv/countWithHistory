"use strict";
document.addEventListener('DOMContentLoaded',function(){

    function createCounter(){
        let count=0;
        let history=[];
        function loadState() {
        const savedCounter = localStorage.getItem('ChangeCount');
        const savedHistory = localStorage.getItem('ChangeHistory');
        if (savedCounter !== null) count = Number(savedCounter);
        history = savedHistory ? JSON.parse(savedHistory) : [];
    }

         function saveState() {
        localStorage.setItem('ChangeCount', String(count));
        localStorage.setItem('ChangeHistory', JSON.stringify(history));
        }

    return {
        loadState,
        saveState,
        increment() {
            count++;
            history.push(count);
            saveState();
            return count;
        },
        decrement() {
            count--;
            if (count < 0) count = 0;
            history.push(count);
            saveState();
            return count;
        },
        reset() {
            count = 0;
            history.push(count);
            saveState();
            return count;
        },
        getCount() {
            return count;
        },
        getHistory() {
            return [...history];
        },
        clearHistory() {
            history = [];
            saveState();
        }
    };
}
    const counter=createCounter();
    counter.loadState();
    
    function UpdateDisplay(){
        const counterDisplay =document.getElementById('counterDisplay');
        counterDisplay.innerText=counter.getCount();
    }
    const historyList = document.getElementById('historyList');
     function renderHistory(){ 
        const historyData=counter.getHistory();
        let html = '';  

        if (historyData.length === 0) {
        html = '<div class="empty-history">История пуста</div>';
        } else {
        for (let i = 0; i < historyData.length; i++) {
            html += `<div>${i + 1}. ${historyData[i]}</div>`;
        }
        }
        historyList.innerHTML = html;

    }  
    const increment = document.getElementById('incrementBtn');
    increment.addEventListener('click',()=>{
        counter.increment();  
        UpdateDisplay();
        renderHistory();
    })
    const decrement = document.getElementById('decrementBtn');
    decrement.addEventListener('click',()=>{
        counter.decrement();
        UpdateDisplay();
        renderHistory();
    })
    const reset = document.getElementById('reset-btn');
    reset.addEventListener('click',()=>{
       counter.reset();
        UpdateDisplay();
        renderHistory();
       
    })
    const clearHistory = document.getElementById('clearHistoryBtn');
    clearHistory.addEventListener('click',()=>{
        counter.clearHistory();
        renderHistory();

    })
 UpdateDisplay();
 renderHistory();

})