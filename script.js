let data = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
];

const buttons = [...document.querySelectorAll('.options')]

const activateClickedButton = (button) => {
    buttons.forEach(b => b.classList.remove('active'));  // To remove the other active buttons
    button.classList.add('active');
};

const clearActivitties = () =>

const renderCards = (clickedOption) => {

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