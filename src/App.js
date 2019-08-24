import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';
import Upload from './components/Upload/Upload';
import information from './information.json';
import headerapp from './headerapp.json';
import firebase from 'firebase';
//import time from './clock/time';

class App extends React.PureComponent {
	
	state = {
	date:new Date(),
		subject:information,
			input: {
			add: '',
			remove: ''
		},
		header:headerapp,
		fileurl:'', 
		progress:''
	};


	callMe(){
		setInterval(() => {
		this.setState({date: new Date()});
		}, 500);
	}

	handleUploadSuccess = (filename) => {

		this.setState({
			progress:''
		})

		firebase.storage().ref('documents').child(filename).getDownloadURL().then(url => this.setState({fileurl: url}));
	}

	onhandleProgress= () =>{
		this.setState({progress:'Uploading'})
	  };
	
	AddProfilenameInputChange = (event,index) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.subject[index].add.Profilename= value;
		});
		this.setState(nextState);
	};

	onAddBoardButtonClick = () => {
		const nextState = produce(this.state, (draft) => {
			const newBoardprofilename=draft.input.add;
			const newBoard ={
				Profile: newBoardprofilename,
				items: [], 
				index: 0,
				add: {
					Profilename: "",
					File:""
				}, 
				remove: ""				
			};
			draft.subject.push(newBoard);
			draft.input.add = '';	
		});
		this.setState(nextState);
	};

	onAddBoardInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input.add = value;
		});
		this.setState(nextState);
	};

	AddSubjectClick = (index) => {
		const nextState = produce(this.state, (draft) => {
			draft.subject[index].add.File= draft.fileurl;
			draft.subject[index].items = draft.subject[index].items.concat(draft.subject[index].add);
			draft.subject[index].items.add = '';
		});
		this.setState(nextState);
	};
 
	RemoveSubjectClick= (i, index) => {
		const nextState = produce(this.state, (draft) => {
			draft.subject[index].items.splice(i, 1);
			});
			this.setState(nextState);
	};

	render() {
		console.log(this.state);
		const {subject,header,progress} = this.state;
		return (
			<div className={styles.alignBoard}>	
				<div className={styles.title}>ONE CLICK, ONE OPPORTUNITY</div>
					<fieldset className={styles.boxp}>
					<legend>Profile:</legend>
						<div className={styles.boxt}>
						<Input type="text" value={this.state.input.add} onChange={this.onAddBoardInputChange}/>
                        <Button type={'add'} onClick={this.onAddBoardButtonClick}></Button> 
						</div>
					</fieldset>
				<div className={styles.date}>
					<h4>FECHA:  {this.state.date.toLocaleDateString()}</h4>
					{/* <h5>HORA : {this.state.date.toLocaleTimeString()}</h5>
					{ this.callMe()}   */}
				</div>
				<div className={styles.profilef}>
					{subject.map((i,index) => (
					<Upload key={index} data={i.items} headers={header} profile={i.Profile} object={i} onhandleUploadSuccess={this.handleUploadSuccess} progress={progress} handleProgress={this.onhandleProgress}  onAddProfilenameInputChange={(event) => this.AddProfilenameInputChange(event,index)} onAddSubjectClick={()=>this.AddSubjectClick(index)} onRemoveSubjectClick={(i)=>this.RemoveSubjectClick(i, index)}/>
					))}		
				</div>
			</div>
		);
	}
	
}

export default App;
