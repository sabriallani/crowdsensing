import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-easy-toast';
import AudioRecorder from './RecorderSensor/AudioRecorder';

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            answers: {},
        }
        this.getAnswer = this.getAnswer.bind(this);
    }

    getAnswer = (answer, question) => {
        //Add the aswer param to the answers
        const answers = this.state.answers;
        answers[question.name] = answer;
        this.setState({ answers: answers });
    }

    submitForm(){
        //Currently this just displays form answer to the console in JSON format
        //But this will send it to a database in a future version
        console.log(JSON.stringify(this.state.answers));
        //Show a toast to inform the user that the form are submit
        this.toast.show('Form submit !');
    }

    displayQuestionsForm(form){
        var input; //Input use to get data from the user
        return(
            //Get all questions from the form
            form.questions.map((question, index) => {
                //Get input type
                switch (question.type) {
                    case "text":
                        input = <TextInput 
                            style={styles.text_input} 
                            multiline
                            onChangeText={(answer) => this.getAnswer(answer, question)}
                        />
                        break;
                    
                    case "audioRecord":
                        input = <AudioRecorder question={question} getAnswer={this.getAnswer}/>
                       break;
                
                    default:
                        break;
                }
                //Display data title and his input
                return(
                    <View style={styles.container} key={index}>
                        <Text style={styles.title_question}> {question.title} </Text>
                        {input}
                    </View>
                );
            })
        );
    }

    render(){
        const form = this.props.navigation.state.params.form; //Form
        return(
            <View style={styles.main_container}>
                <View style={styles.title_container}>
                    <Text style={styles.title}>{form.title}</Text>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.subhead}>Description</Text>
                        <Text style={styles.text}>{form.description}</Text>
                    </View>
                    {this.displayQuestionsForm(form)}
                    <TouchableOpacity style={styles.button} onPress={() => this.submitForm()}>
                        <Text style={styles.text_button}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Toast ref={(toast) => this.toast = toast}/> 
            </View>
            
        );
    };
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: '#331245',
        flex: 1
    },
    title_container: {
        padding: 30,
        borderBottomLeftRadius: 60,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subhead: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5
    },
    container: {
        backgroundColor: '#441d59',
        borderRadius: 20,
        margin: 10,
        padding: 10
    },

    title_question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5
    },
    text: {
        color: '#ffffff'
    },
    text_input: {
        color: '#ffffff',
        backgroundColor: '#70388f',
        borderRadius: 20,
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    button: {
        padding: 10,
        backgroundColor: '#862db3',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        marginTop: 'auto',
        marginBottom: 20
    },
    text_button:{
        color: '#ffffff',
        fontSize: 20
    },
});

export default Form;