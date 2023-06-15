import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import VoteScreen from "./pages//VoteScreen/VoteScreen";
import Results from "./pages/Results/Results";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage/Hompage.js";
import CreateJoinGroup from "./pages/CreateJoin/CreateJoin.js";
import JoinGroup from "./pages/JoinGroup/JoinGroup";
import supabase from "./supabaseClient";
import FinalResults from "./pages/FinalResults/FinalResults";
import PreFilter from "./pages/PreFilterPage/PreFilterPage.js";

function App() {
  const navigate = useNavigate();
  // useState for setting the round count in the currentRound variable in VoteScreen.js
  const [roundCount, setRoundCount] = useState(0);

  // useState for setting the error when fetching data from Supabase
  const [fetchError, setFetchError] = useState(null);
  //useState for setting the venues data that is fetched from Supabase
  const [venueData, setVenueData] = useState(null);
  //set useState to hold the current filters in an object
  //REMEMBER FOR LATER - FILTER FOR OUTDOOR/INDOOR?
  const roundTypes = ["venue_type", "cuisine_type", "cost_rating"];

  
  const [prefilters, setpreFilters] = useState({
    halal_options: null,
    vegan_options: null,
    vegetarian_options: null,
    kosher_options: null,
    gluten_free_options: null,
    cost_low: null,
    cost_medium: null,
    cost_high: null,
  });


  const [voteResults, setVoteResults] = useState([]);


  const [filters, setFilters] = useState({
    venue_type: null,
    cuisine_type: null,
    cost_rating: null,
  });


  //When you click on a button the function below is triggered. It takes in the option name and the value of the option. It then sets the filters state to the option name and value. This is then passed down to the vote screen and used to filter the data from supabase.

  function setFilter(optionName, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [optionName]: value,
    }));
  }


  function handleRestart(){
    setFilters({
      venue_type:null,
      cuisine_type:null,
      cost_rating:null,
    })
    setRoundCount(0);
    console.log(`before the reset ${voteResults}`);
    setVoteResults([]);
    console.log(`after the reset ${voteResults}`);
    navigate("/");
    setRounds([
      [
        { id: 1, name: "Restaurant", score: 0 },
        { id: 2, name: "Cinema", score: 0 },
        { id: 3, name: "Bar", score: 0 },
      ],
      [
        { id: 4, name: "Mexican", score: 0 },
        { id: 5, name: "Chinese", score: 0 },
        { id: 6, name: "Italian", score: 0 },
        { id: 7, name: "Indian", score: 0 },
        { id: 8, name: "Burger", score: 0 },
        { id: 9, name: "Thai", score: 0 },
      ],
      [
        { id: 10, name: 1, score: 0 },
        { id: 11, name: 2, score: 0 },
        { id: 12, name: 3, score: 0 },
      ]
    ])
  }

  const [rounds, setRounds] = useState([
    [
      { id: 1, name: "Restaurant", score: 0 },
      { id: 2, name: "Cinema", score: 0 },
      { id: 3, name: "Bar", score: 0 },
    ],
    [
      { id: 4, name: "Mexican", score: 0 },
      { id: 5, name: "Chinese", score: 0 },
      { id: 6, name: "Italian", score: 0 },
      { id: 7, name: "Indian", score: 0 },
      { id: 8, name: "Burger", score: 0 },
      { id: 9, name: "Thai", score: 0 },
    ],
    [
      // CHANGE THIS BEFORE SPRINT DEMO TO ANOTHER FILTER!!
      { id: 10, name: 1, score: 0 },
      { id: 11, name: 2, score: 0 },
      { id: 12, name: 3, score: 0 },
    ],

    // ... Add more rounds with different options as needed
    //... the rounds pathways can possibly be traversed by creating round blocks. The block that is selected in the first round will determine the following index of the array to be used in the next round (inside the roundCount) and all subsequent rounds will simply be adding 1 to the round count - to end the rounds and display the very final result page, we will need to add a conditional statement that will check if the round count is equal to the index of the last round in the array for that pathway. If it is, then the results page will be displayed, if not, then the next round will be displayed. (eg. restaurant pathway, round 1: restaurant, cinema, bar. round 2: mexican, chinese, italian, indian, burger, thai. round 3: £, ££, £££. round 4: results page.)
  ]);


  

  let currentResults = rounds.map((round) => {
    return round.map((option) => {
     if (option.score >= 1) {return option.name;} else {return null;}
  
    });
  });



  



  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("venues")
        .select()
        .eq("venue_type", filters.venue_type)
        .eq("cuisine_type", filters.cuisine_type)
        .eq("cost_rating", filters.cost_rating);

      if (error) {
        setFetchError("could not fetch venues");

        console.log(fetchError);
      }
      if (data) {
        setVenueData(data);
        setFetchError(null);
        console.log(data);
      }
    };
    fetchData();

  }, [roundCount,filters,fetchError])


  //this function is passed down to the results page and is triggered by the next button. It adds 1 to the round count which will then be used to determine which round is displayed in the vote screen.

  function handleNextRound() {

    if (roundCount === rounds.length - 1) {
      navigate("/finalresult");
    } else {
      setRoundCount(roundCount + 1);
      navigate("/votescreen");
    }
  }

  return (

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/create-join" element={<CreateJoinGroup />} />
      <Route path="/join-group" element={<JoinGroup />} />


        <Route
          path="/votescreen"
          element={
            <VoteScreen
              rounds={rounds}
              setRounds={setRounds}
              roundCount={roundCount}

              venueData={venueData}
              setFilter={setFilter}
              roundType={roundTypes}
              filters={filters}
              voteResults={voteResults}
              setVoteResults={setVoteResults}
              currentResults={currentResults}

            />
          }
        />
        <Route
          path="/results"
          element={
            <Results
              handleNextRound={handleNextRound}
              rounds={rounds}
              roundCount={roundCount}
              venueData={venueData}
              voteResults={voteResults}
            />
          }
        />
        <Route path="/finalresult" element={<FinalResults venueData={venueData} handleRestart={handleRestart}/>} />
 <Route path="/prefilter" element={<PreFilter prefilters={prefilters} 
        setpreFilters={setpreFilters}
      />} />
      </Routes>
    
  );
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
