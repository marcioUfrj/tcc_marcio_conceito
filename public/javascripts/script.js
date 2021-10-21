const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const canDo1Button = document.getElementById('can-do-1-btn')
const canDo2Button = document.getElementById('can-do-2-btn')


let shuffledQuestions, currentQuestionIndex
let questions

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

canDo1Button.addEventListener('click', setQuestion1)
canDo2Button.addEventListener('click', setQuestion2)

function resetStart(textStart, resetQuestion) {
  if (resetQuestion == true) {
    questionContainerElement.classList.add('hide')
  }
  startButton.innerText = textStart
  startButton.classList.remove('hide')
}

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions // questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    //startButton.innerText = 'Restart'
    //startButton.classList.remove('hide')
    resetStart('Recomeçar', false)
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


function setQuestion1() {
    questions = [
      {
        question: 'Olá, sou Sakura. Qual o seu nome?',
        answers: [
          { text: 'Me chamo Fernanda.', correct: true },
          { text: 'Tenho 25 anos', correct: false },
          { text: 'Sou do Brasil', correct: false },
          { text: 'Moro no Rio de Janeiro', correct: false }
        ]
      },
      {
        question: 'Fernanda, prazer em te conhecer.',
        answers: [
          { text: 'De nada.', correct: false },
          { text: 'Prazer em te conhecer também', correct: true },
          { text: 'Até amanhã', correct: false },
          { text: 'Obrigado', correct: false }
        ]
      }
    ]

    resetStart('Começar', true)
    resetState()
}

function setQuestion2() {
    questions = [
      {
        question: 'Você é de onde?',
        answers: [
          { text: 'Sou do Brasil', correct: true },
          { text: 'Tenho 19 anos', correct: false },
          { text: 'Me chamo Fernanda.', correct: false },
          { text: 'Até amanhã', correct: false }
        ]
      },
      {
        question: 'Legal. Eu sou japonês. Você fala japonês?',
        answers: [
          { text: 'Até amanhã.', correct: false },
          { text: 'Boa tarde.', correct: false },
          { text: 'Moro em Belo Horizonte.', correct: false },
          { text: 'Sim, eu falo.', correct: true }
        ]
      }
    ]
    
    resetStart('Começar', true)
    resetState()
}


questions = [
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  }
]