import React, { useState, useEffect } from 'react';

function FileUploader(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [animalDetails, setAnimalDetails] = useState(null);
  const [animalsDataList, setAnimalsDataList] = useState([])
  const [userPlan, setUserPlan] = useState("")
  const [showAnimalDetails, setShowAnimalDetails] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [errorMessageState, setErrorMessageState] = useState(false)
  const [newAnimalName, setNewAnimalName] = useState("")
  const [newAnimalSuccessMessage, setNewAnimalSuccessMessage] = useState("")

  
  //Listen to the users (props) coming from the login page and capture the user's plan
  useEffect(() => {
    if (props.userData) {
      setUserPlan(props.userData.idToken.payload['custom:Plan']);
    }
  }, [props.userData]);
  

  function handleAnimalsData(data){
    setAnimalDetails(data);
  }

  //Change the mainlands array to configured string
  function handleMainlands(mainLands){
    if (mainLands){
      const landsListString = mainLands.map(land => land).join(", ");
      return landsListString
    }
    else{
      return ""
    }
  }

  // Add useEffect hook to handle outcome datat from the GET method and update animalsDataList
  useEffect(() => {
    if (animalDetails) {
      const newAnimalsDataList = animalDetails.map(animal => ({
        Name: animal.name,
        Mainlands: handleMainlands(animal.locations),
        Location: animal.characteristics["location"],
        OtherNames: animal.characteristics["other_name(s)"],
        Colors: animal.characteristics["color"],
        Skin: animal.characteristics["skin_type"],
        Habitat: animal.characteristics["habitat"],
        Prey: animal.characteristics["prey"],
        GroupBehavior: animal.characteristics["group_behavior"],
        LitterSize: animal.characteristics["litter_size"],
        BiggestThreat: animal.characteristics["biggest_threat"],
        Predators: animal.characteristics["predators"],
        DistinctiveFeature: animal.characteristics["most_distinctive_feature"],
        LifeSpan: animal.characteristics["lifespan"],
        Weight: animal.characteristics["weight"],
        Lenght: animal.characteristics["length"],
        AgeOfMaturity: animal.characteristics["age_of_sexual_maturity"],
        TopSpeed: animal.characteristics["top_speed"],
        NameofYoung: animal.characteristics["name_of_young"],
        AgeOfWeaning: animal.characteristics["age_of_weaning"],
        Slogan: animal.characteristics["slogan"]
      }));
      setAnimalsDataList(newAnimalsDataList);
    }
  }, [animalDetails]);

  function handleError(data_to_string){
    setErrorMessage(data_to_string)
    setErrorMessageState(true)
  }
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file.name);
  };
  
  // Handle uploaded file, send (POST and GET) to AWS and retrieve the animal's details
  const handleUpload = async () => {
    setUploading(true);
    //console.log(selectedFileName);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      //upload the image to server
      const post_response = await fetch('http://ec2-34-230-71-62.compute-1.amazonaws.com/upload_image', {
      method: 'POST',
      body: formData,
      });
      const post_response_string = post_response.toString(); //  convert to string
      //console.log(post_response_string)
      if (post_response_string=='Error uploading file'){
        setErrorMessage("Error uploading file, Please contact support")
        setErrorMessageState(true)
        

      }
      else{
        setErrorMessageState(false)
      }
    } catch (error) {
      //console.error('Error occurred during file upload: ', error);
      setErrorMessage('Error occurred during file upload: '+error)
      setErrorMessageState(true)
      
    }
    //Reset uploade's varaibles
    setSelectedFile(null);
    setUploading(false);

    try {
      // Pass the file's name and get animal's data from server
      const get_response = await fetch('http://ec2-34-230-71-62.compute-1.amazonaws.com/animal_details/'+selectedFileName, {
      method: 'GET'
      });
      const data = await get_response.json(); //  convert to json
      //console.log(data)
      const data_to_string = data.toString(); //  convert to string
      console.log(data_to_string)

      if (data_to_string=="There isn't a match to an animal in our data-base."){
        handleError(data_to_string)
      }
      else{
        setErrorMessageState(false) 
        handleAnimalsData(data)
        setShowAnimalDetails(true)
        
      }
      
    } catch (error) {
      //console.error('Error occurred during get animal details:', error);
      setErrorMessage('Error occurred during get animal details: '+error)
      setErrorMessageState(true)
      
    }
    //reset varaible
    setSelectedFileName(null);
  };

  // Handle new animal's name, uploaded the name to server and get success/failure response 
  const onSubmit = async event => {
    event.preventDefault();
    setNewAnimalSuccessMessage("")
    //console.log(newAnimalName)
    try {
      const formData = new FormData();
      //create the request's data
      const requestBody = {
        animal_name: newAnimalName,
      };
      const post_response = await fetch('http://ec2-34-230-71-62.compute-1.amazonaws.com/add_new_animal', {
      method: 'POST',
      body: JSON.stringify(requestBody), // Convert the request data to JSON
      });
      //console.log(post_response)
      const post_response_string =  await post_response.text() //  convert to text
      //console.log(post_response_string)

      if (post_response_string=='Error in adding the new animal. Please contact supportError uploading file'){
        setNewAnimalSuccessMessage("Error in adding the new animal. Please contact support")

      }
      else{
        setNewAnimalSuccessMessage(post_response_string)
      }
    } catch (error) {
      //console.error('Error occurred during adding new animal name: ', error);
      setNewAnimalSuccessMessage('Error occurred during adding new animal name: '+error)
    }
    setNewAnimalName("")

    
  };
  function handleResetButton(){
    setShowAnimalDetails(true)
    setErrorMessageState(false)
    
  }
      
  
  return (
    <div>
      {/* before upload (don't show animal details) VS after upload (show animal details or Error message) */}
      {showAnimalDetails ? (
          <div >
            {console.log('A')}
            {/* show error message */}
            {errorMessageState && (
              <div>
                {console.log('b')}
                <b><p className="text-danger" >{errorMessage}</p></b>
  
                <br/><br/>
                {/* A button to "get back" to the uploading process */}
                <div className="d-grid">
                  <button className="btn btn-primary" onClick={()=> setShowAnimalDetails(false)}>Click here for another session</button>        
                </div> 
              
              </div>
              
            )}
            {/* show animal details */}
            {!errorMessageState && (
              <div>
                {console.log('c')}
                <h1>Animal Details:</h1>
                {/* For Free Tier users */}
                {animalDetails && userPlan=="Free Tier" && animalsDataList.map((animal) => (
                  <div>
                    <p>
                    <b><h3>{animal.Name}</h3></b>
                    <b>Location:</b> {animal.Mainlands}. <br/> 
                    <b>Other Names:</b> {animal.OtherNames}. <br/> 
                    <b>Habitat:</b> {animal.Habitat}. <br/> 
                    <b>Name of Young:</b> {animal.NameofYoung}. <br/>
                    <b>Slogan:</b> {animal.Slogan}.
                    </p><br/>
                  </div>
                ))}

                {/* For Professional users */}
                {animalDetails && userPlan=="Professional" && animalsDataList.map((animal) => (
                  <div>
                    <p>
                    <b><h3>{animal.Name}</h3></b>
                    <b>Location:</b> {animal.Location}. <br/> 
                    <b>Colors:</b> {animal.Colors}. <br/> 
                    <b>Habitat:</b> {animal.Habitat}. <br/> 
                    <b>Prey:</b> {animal.Prey}. <br/> 
                    <b>Group Behavior:</b> {animal.GroupBehavior}. <br/>
                    <b>Other Names:</b> {animal.OtherNames}. <br/> 
                    <b>Litter Size:</b> {animal.LitterSize}. <br/> 
                    <b>Name of Young:</b> {animal.NameofYoung}. <br/>
                    <b>Slogan:</b> {animal.Slogan}.
                    </p><br/>
                  </div>
                ))}

                {/* For Entreprise users */}
                {animalDetails && userPlan=="Entreprise" && animalsDataList.map((animal) => (
                  <div>
                    <p>
                    <b><h3>{animal.Name}</h3></b> 
                    <b>Name of Young:</b> {animal.NameofYoung}. <br/>
                    <b>Location:</b> {animal.Location}. <br/> 
                    <b>Other Names:</b> {animal.OtherNames}. <br/> 
                    <b>Colors:</b> {animal.Colors}. <br/> 
                    <b>Skin:</b> {animal.Skin}. <br/> 
                    <b>Habitat:</b> {animal.Habitat}. <br/> 
                    <b>Prey:</b> {animal.Prey}. <br/> 
                    <b>Group Behavior:</b> {animal.GroupBehavior}. <br/>
                    <b>Biggest Threat:</b> {animal.BiggestThreat}. <br/>
                    <b>Predators:</b> {animal.Predators}. <br/> 
                    <b>Distinctive Feature:</b> {animal.DistinctiveFeature}. <br/>
                    <b>Litter Size:</b> {animal.LitterSize}. <br/> 
                    <b>Life Span:</b> {animal.LifeSpan}. <br/> 
                    <b>Weight:</b> {animal.Weight}. <br/> 
                    <b>Lenght:</b> {animal.Lenght}. <br/> 
                    <b>Top Speed:</b> {animal.TopSpeed}. <br/> 
                    <b>Age of Maturity:</b> {animal.AgeOfMaturity}. <br/> 
                    <b>Age of Weaning:</b> {animal.AgeOfWeaning}. <br/>
                    <b>Slogan:</b> {animal.Slogan}.
                    </p><br/>
                  </div>
                  
                ))}
                {/* A button to "get back" to the uploading process */}
                <div>
                {console.log('d')}
                  <br/><br/>
                  <div className="d-grid">
                    <button className="btn btn-primary" onClick={()=> setShowAnimalDetails(false)}>Click here for another session</button>        
                  </div>
                </div>
              </div>
            )}
            

          </div>

        ) : (
          <div>
            {console.log('e')}
            {/* show error message */}
            {errorMessageState && (
              <div>
                {console.log('f')}
                <b><p className="text-danger" >{errorMessage}</p></b>

                <br/><br/>
                {/* A button to "get back" to the uploading process */}
                <div className="d-grid">
                  <button className="btn btn-primary" onClick={async () =>{handleResetButton()} }>Click here for another session</button>     
                </div> 
              
              </div>
              
            )}
             
            {!errorMessageState && (
              <div className="d-grid">
                {console.log('g')}
                <h3>Uploade your image</h3>
                <h5>Uploade your animal's image and reveal the details:</h5>
                <input 
                  type="file" 
                  className="form-control"
                  onChange={handleFileSelect} 
                />
                <br/>
                <button 
                  onClick={handleUpload} 
                  className="btn btn-primary"
                  disabled={!selectedFile || uploading}>
                  Upload
                </button>
              </div>
            )} 
          </div>         
        )
      }

      {/* For Entreprise users - Add new animal name process */}
      {userPlan=="Entreprise" && (
        <div>
          <br/><br/>
          <form onSubmit={onSubmit}>
            <h3>Can't find your animal?</h3>
            <h5>Add your animal name and try again:</h5>
            <div className="mb-3">
              <label>Animal Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Animal name"
                value={newAnimalName} 
                onChange={event => setNewAnimalName(event.target.value)}
                required
              />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Add New Animal
                </button>
              </div>
              <br></br>
              <b><p style={{ color: 'purple' }}>{newAnimalSuccessMessage}</p></b>
          </form>
        </div>
        
      )}
      
    </div>
      
  );
};
export default FileUploader;