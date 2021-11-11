const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const skipButton = document.getElementById('skip-btn')
const questionContainerElement = document.getElementById('question-container')
const exerciseNameElement = document.getElementById('exercise-name')
const descriptionElement = document.getElementById('description')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const stateElement = document.getElementById('state')

let shuffledQuestions, currentQuestionIndex, shuffledExercises
let answers = []

/*startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  //currentQuestionIndex++
  setNextQuestion()
})*/

function resetStart(textStart, resetQuestion) {
  // resetar o estado: hide no container das Questoes
  if (resetQuestion == true) {
    questionContainerElement.classList.add('hide')
  }
  startButton.innerHTML = textStart
  startButton.classList.remove('hide')
}

function startGame() {
  //shuffledQuestions = setNivel(choiceElement.innerText) //questions // questions.sort(() => Math.random() - .5)
  //console.log(shuffledQuestions)
  //currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  showQuestion()
}

function setNextQuestion() {
  //resetState()
  showQuestion()
}

function showQuestion(state) {
  //questionElement.innerText = question.question
  Array.from(answerButtonsElement.children).forEach(button => {
    button.addEventListener('click', selectAnswer)
  })
  /*question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })*/
}

function resetState(flagStart) {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  if (flagStart == true) {
    startButton.classList.add('hide')
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if(stateElement.innerText == 'end')  {
    skipButton.innerHTML = 'Próximo Exercício'
    resetStart('Recomeçar', false)
  } else {    
    nextButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct == 'true') {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


function setState (state) {
  if (state == 'preparation') {
    //resetStart('Começar', true)
    resetState(false)
  } else if (state == 'start') {
    startGame()
    resetState(true)
  } else if (state == 'next') {
    showQuestion()
    resetState(true)
  } else if (state == 'end') {
    showQuestion()
    resetState(true)
  }
}

setState(stateElement.innerText)