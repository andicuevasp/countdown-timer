let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const form = document.querySelector("[name = customForm]");

function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval( () => {
        const secondsLeft = Math.round((then - Date.now())/ 1000);
        //check if we should stop the interval
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        //display timer
        displayTimeLeft(secondsLeft);
       

    },1000);

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display; 
};

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour; // this is so that the time shown is not military time
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? "0" : ""}${minutes}`;

};

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}


buttons.forEach(button => button.addEventListener("click", startTimer));

form.addEventListener("submit",function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})