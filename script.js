let data = [];

const buttons = [...document.querySelectorAll('.options')]

const activateClickedButton = (button) => {
    buttons.forEach(b => b.classList.remove('active'));  // To remove the other active buttons
    button.classList.add('active');
};

const getData = async () => {
  // fetch data
  const response = await fetch('./data.json');
  const fetchedData = await response.json();
  data = fetchedData
  buttons[1].click()
}

const clearActivities = () => {
  // clear the existing cards from the html
  const activities = document.querySelectorAll('.activity-tracker');
  activities.forEach(a => a.remove());
}

const renderCards = (clickedOption) => {
  clearActivities()
  const activityTracker = document.querySelector('.container')

    const calcTimeFrame = (option) => {
       if (option === 'daily'){
        return 'Yesterday';
       }else if(option === 'weekly'){
        return 'Last Week';
       }else if(option ==='monthly'){
        return 'Last Month';
       }
    }

   data.forEach(activity => {
    const name = activity.title;
    const activityClass = name.toLowerCase().replace(' ', '-'); // to remove the space from the title inorder to work with the css
    const timeFramesData = activity.timeframes[clickedOption];  // clickedOption gives bytes a string and we cant use the dot notation to access the property of an object or value but we can use squaredbrackets instead
    const previousTimeFrame = calcTimeFrame(clickedOption);
    const div = document.createElement('div');
    div.classList.add('activity-tracker', activityClass)
    const stringToInject = `
    <div class="activity-bg">
          <img src="./images/icon-${activityClass}.svg" alt="play-bg">
        </div>
        <div class="activity-info">
          <div class="activity-header">
            <h2 class="activity-name">${name}</h2>
            <button class="activity-options">
              <img src="./images/icon-ellipsis.svg" alt="options">
            </button>
          </div>
          <div class="activity-time">
            <h3 class="activity-current-time">${timeFramesData.current}hrs</h3>
            <p class="activity-previous-time">${previousTimeFrame} - <span class="time">${timeFramesData.previous}hrs</span></p>
          </div>
        </div>
      </div>
    `
    
    div.innerHTML = stringToInject;
    activityTracker.append(div);
  })
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        activateClickedButton(button);
        const clickedOption = button.dataset.option;
        renderCards(clickedOption);
    })
});

getData();