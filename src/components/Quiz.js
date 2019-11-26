import React, { Component } from 'react'
import {QuizData} from "./QuizData";
import "./Quiz.css";
import {Link} from 'react-router-dom';

class Quiz extends Component {
    state={
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        quizEnd: false,
        score: 0,
        disabled: true
    }

    loadQuiz = () => {
        const {currentQuestion} = this.state;
        this.setState(() => {
            return {
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answers: QuizData[currentQuestion].answer
            }
        })
    }

    nextQuestionHandler = ()=> {
        const {userAnswer, answers, score} = this.state;
        this.setState({
                currentQuestion: this.state.currentQuestion+1
            });
        
        if(userAnswer === answers){
            this.setState({
                score: score+1
            })
        }
        console.log(this.state.currentQuestion);
        
    }

    componentDidMount(){
        this.loadQuiz();
    }

    componentDidUpdate(prevProps, prevState){
        const {currentQuestion} = this.state;
        if(this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(() => {
                return {
                    disabled:true,
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].options,
                    answers: QuizData[currentQuestion].answer
                }
            })
        }
    }

    checkAnswer = (answer)=>{
        this.setState({
            userAnswer: answer,
            disabled:false
        });
    }

    finishQuestionHandler = () => {
        if(this.state.currentQuestion === QuizData.length -1 ){
            this.setState({
                quizEnd: true
            })
        }
    }

    restartQuiz = () => {
        this.setState({
            userAnswer: null,
            currentQuestion: 0,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true
        });
        this.loadQuiz();
    }
    render() {
        const {questions, options, currentQuestion, userAnswer,quizEnd} = this.state;

        if(quizEnd){
           return (
            <div>
                <h2>Game Over. Final Score is {this.state.score}</h2>
                <p>The correct answer for the question was:</p>
                <ul>
                    {
                    QuizData.map((item,index) => (
                    <li>{item.answer}</li>
                    ))
                    }
                </ul>

                <button className='btn btn-outline-primary' onClick={()=>this.restartQuiz()}>Restart the quiz</button>
            </div>)
        }
        return (
            <div>
                <h1>Questionaiire</h1>
                <span>{`${currentQuestion+1} out of ${QuizData.length}`}</span>
                <h3 className='mt-5'>{questions}</h3>
                {options.map(option => (
                <p  onClick={() => this.checkAnswer(option)}
                    className={`mt-5 border p-4 options ${userAnswer === option ? "selected": null}`} key={option.id}>
                    {option}
                </p>
                ))}
                
                {currentQuestion < QuizData.length -1 && (
                    <button onClick={this.nextQuestionHandler}
                    className="btn btn-secondary" disabled={this.state.disabled}>Next</button>
                )}

                {currentQuestion === QuizData.length -1 && (
                    <button onClick={this.finishQuestionHandler}
                    className="btn btn-secondary">Finish</button>
                )}
            </div>
        )
    }
}
export default Quiz;