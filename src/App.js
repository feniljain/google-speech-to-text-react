import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

	const [file, setFile] = useState('');

	const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
	});

	const sendReq = async  () => {
		let res = await toBase64(file);
		console.log(typeof(res));
		console.log(res);
		console.log(file.name);
	fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${process.env.REACT_APP_API_KEY}`, {
		method: "POST",
				headers: {
						'Content-type':'application/json',
				},body: JSON.stringify({
					"config": {
							"encoding":"FLAC",
							"languageCode": "en-US"
					},
					"audio": {
							"content": res,
					}
				})
	}).then((resp) => resp.json())
		.then((data) => {
			console.log(data);
		}).catch((err) => {
			console.log("Error: ", err);
		});
		//var reader = new FileReader();
		//var fileByteArray = [];
		//reader.readAsArrayBuffer(file);
		//reader.onloadend = function (evt) {
		//		if (evt.target.readyState === FileReader.DONE) {
		//			 var arrayBuffer = evt.target.result,
		//					 array = new Uint8Array(arrayBuffer);
		//			 for (var i = 0; i < array.length; i++) {
		//					 fileByteArray.push(array[i]);
		//				}
		//		}
		//}
	}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
				<input type = "file" accept = "audio/*" capture onChange={(e) => {
					console.log(e.target.files[0].name);
					setFile(e.target.files[0]);
				}}/>
				<button type="button" onClick={() => {
					sendReq();
				}}>Convert</button>
      </header>
    </div>
  );
}

export default App;
