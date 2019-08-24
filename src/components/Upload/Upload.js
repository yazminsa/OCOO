import * as React from 'react';
import styles from './Upload.module.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { IconXMark } from '../../resources/svg/Icons';
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader';
import firebaseConfig from '../firebase/index';

firebase.initializeApp(firebaseConfig);

export default (class Upload extends React.PureComponent {
	formatData = (data, type) => {
		switch (type) {
			case 'text':
				return data;
			case 'link':
				return <a href={data} target='_blank' rel="noopener noreferrer"> URL </a>;
			default:
				return data;
		}
	};



	render() {
		const { data, profile, object, headers, progress, onAddProfilenameInputChange, onhandleUploadSuccess, handleProgress, onAddSubjectClick, onRemoveSubjectClick} = this.props;
		return (
			<div className={styles.main}>
                <h2>{profile}</h2>
				<table className={styles.Upload}>                    
					<thead><tr className={styles.header}>
							{headers.map((header, i) => {
								return (
									<th key={i} className={styles.headern}>{header.name}</th>
								);
							})}</tr>
					</thead>
					<tbody>{data.map((item, i) => {
							return (
								<tr key={i} className={styles.dato}>
									{headers.map((header, i) => {
										return (
											<td key={i} className={styles.datosub}>{this.formatData(item[header.value], header.type)}</td>);
									})}
									<td><div onClick={()=>onRemoveSubjectClick(i)}><IconXMark className={styles.icon} /></div></td>
								</tr>
							);
						})}
					</tbody>
					<tfoot><tr className={styles.newdata}>
							<td className={styles.newdatab}>
							<Input type="text" value={object.add.Profilename} onChange={onAddProfilenameInputChange}/>
							</td>
							<td className={styles.newdatab}>
							<p>{progress}</p>
							<label style={{backgroundColor: '#0a55e0ec', color: 'white', padding: 12, borderRadius: 10, pointer: 'cursor'}}>
							UPLOAD
							<FileUploader 
							hidden
							storageRef={firebase.storage().ref('documents')}
							onUploadSuccess={onhandleUploadSuccess}
							onProgress={handleProgress}/>
 						    </label>
							</td>
							<td className={styles.newdatab}>
							<Button type={'add'} onClick={onAddSubjectClick} />
							</td>
							
							
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});
