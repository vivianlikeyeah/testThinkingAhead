//Written By Vivian Bakiris 2020
//The following is The Learning Tree to support the Thinking Ahead School

//An array containing all of the nodes within the learning tree
allNodes =[1,2,3,4,5,50,6,7,8,9,10,11,12,13,14,15]

var engaged = false;

//Given a nodeID, returns the index of the node within the all Nodes Array
function getIndex(node){
  var c = 0;
  for(x=0; x<allNodes.length; x++){
    if(node == allNodes[x]){
      c = x;
      break;
    }
  }
  return c;
}
//Define the Modal to display Node Information
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//Start the network with the following parameters
function startNetwork(data) {
  //Obtain the container to hold the network
  const container = document.getElementById('mynetwork')
  //Define network options.
  const options = {
    interaction:{
      hover:true,
      keyboard: {
        enabled: true
      }
    },
    physics:{
        enabled: true,
        forceAtlas2Based: {
     theta: 0.5,
     gravitationalConstant: 0,
     centralGravity: 0.5,
     springConstant: 0.5,
     springLength: 100,
     damping: 0.4,
     avoidOverlap: 2
    }

    },
      nodes: {
        shape: "dot",
        size: 30,
        font: { size: 12,  color: "black"  },
        borderWidth: 5,  shadow: true,
        color: {
      hover: {
        border: '#f0d700',
        background: '#f0d700'
      }
    },
      },
        edges: { width: 2, shadow: true},
        groups: {
            4:{color:{background: 'grey', border: 'grey'}  },
            3:{color:{background: '#8682ff', border: '#8682ff'}},
            6:{color:{background: '#ff829d', border: '#ff829d'}},
            100: {color: { background: '#f0d700', border: '#f0d700'} },
            7:{color:{background: '#ff9f82', border: '#ff9f82'}}
          },
          height: '85%'
      };
  //Create a new visualisation
  network = new vis.Network(container, data, options)

  //This has no purpose.
  network.on("selectNode", function (params) {
       console.log('selectNode Event:', params);
   });

   //On hover, update the information box on the right
   network.on("hoverNode", function (params) {
      var rightbox = document.getElementById("moreinfo")
       var text = ""
       //Start Node Special Case
       if(params.node == 0){
         var html = text.concat("<b>", nodeData[params.node].title,
         "</b> <br>",  nodeData[params.node].blurb ," <br>Pre-requisite Understanding: ", nodeData[params.node].prereq )
       }
       //Theories Node Special Case
       else if(params.node==50){
         var html = text.concat("<b>", nodeData[params.node].title,
         "</b> <br>",  nodeData[params.node].blurb ," <br>Pre-requisite Understanding: ", nodeData[params.node].prereq )
       }
       //All other nodes
       else{
         var html = text.concat("<b>", nodeData[params.node].title,
         "</b> <br>",  nodeData[params.node].blurb ,"<br>Node URL: "," <br>Pre-requisite Understanding: ", nodeData[params.node].prereq )
       }
       //Update HTML
      rightbox.innerHTML = html

   });

   //When a user brings their cursor off the node, return the info box to the generic message.
   network.on("blurNode", function (params) {
        //console.log('blurNode Event:', params);
        var rightbox = document.getElementById("moreinfo")
        var html = "To complete the Thinking Ahead Programme you must complete <b> all </b> Core nodes </b> and <b> a minimum of 3 </b> Optional nodes."
        rightbox.innerHTML = html
        //Change box pop up
    });


  //When a user clicks on the network
  network.on( 'click', function(properties) {
        //Obtain X and Y coordinates - no longer used but left here in case relevant later.
        var xcoord = properties.pointer.DOM.x;
        var ycoord = properties.pointer.DOM.y;

          var modal = document.getElementById("myModal");
          if(properties.nodes.length > 0){
            engaged = true;
            nodeID = properties.nodes[0]
            counter = getIndex(nodeID) + 1
            if(counter > 15){
              counter = 0
            }
            currentNode = allNodes[counter]
            if(nodeData[nodeID]){
              var modalcontent = document.getElementById("modal-content")
              var text = ""
              var html = text.concat("<p> Node: <b>", nodeData[properties.nodes[0]].title,
              "</b> <br>Summary: ",  nodeData[properties.nodes[0]].blurb ,"<p> Node URL: ", "<a href=\"", nodeData[properties.nodes[0]].url , "\" target=\"_blank\">Learn Now</a>",
            " <br>Pre-requisite Understanding: ", nodeData[properties.nodes[0]].prereq )

              if(nodeID == 300){

                var html = text.concat("<p><b>", nodeData[properties.nodes[0]].title,
                "</b> <br>",  nodeData[properties.nodes[0]].blurb)
              }
              else if (nodeID==50){
                var html = text.concat("<p> Node: <b>", nodeData[properties.nodes[0]].title,
                "</b> <br>Summary: ",  nodeData[properties.nodes[0]].blurb,
              " <br>Pre-requisite Understanding: ", nodeData[properties.nodes[0]].prereq )

              }
              else{
                var html = text.concat("<p> Node: <b>", nodeData[properties.nodes[0]].title,
                "</b> <br>Summary: ",  nodeData[properties.nodes[0]].blurb ,"<p> Node URL: ", "<a href=\"", nodeData[properties.nodes[0]].url , "\" target=\"_blank\">Learn Now</a>",
              " <br>Pre-requisite Understanding: ", nodeData[properties.nodes[0]].prereq )


              }
              modalcontent.innerHTML = html
              modal.style.display = "block";

            }
            else{
              alert("Oops! This node has been misplaced. Please contact IT to report this problem at digital@tedi-london.ac.uk.")
              console.log("This node was not defined in the nodeData array, we don't have the additional info needed to display")
            }
          }
          else{
            console.log("here")
            currentNode = allNodes[0]
            counter = 0
          }

      });

    }

    //All the Node metadata
    nodeData ={
      "15":{title:"Employability", prereq: "Presenting your Idea", blurb: " This node includes an overview of essential employability skills and ways to develop your own employability. You will learn about the skills that employers look for, how to build your experience, applying for a job, and making the most of networking.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FEmployability%7C00818BFB-6A1B-3349-B09B-270381CFB16A%2F%29"},
      "4":{title:"User-centred design", prereq: "Research Skills", blurb: "This node will equip you with the knowledge necessary for effective user-centred design. You will learn about the stages involved in user-centred design, including creating a brief and requirements, considering the user, design thinking, co-design, and user testing. ", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FUser-centred%20design%7C931436CE-5960-4260-BBAB-45E47325B6D0%2F%29"},
      "1":{title:"Working effectively", prereq: "None", blurb: "This node will help you to develop the knowledge and skills needed to work effectively and collaboratively online. You will gain tips on how to make use of online platforms to help you achieve success in your project.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FWorking%20Effectively%7C16A9386A-886F-4357-AB5D-DE4B87BEFE59%2F%29"},
      "5":{title:"Understanding your Users", prereq: "User-centred design", blurb: "This node will assist you in developing an understanding of the different user groups highlighted in this project. This will include information relating to mental health, dementia, autistic spectrum disorder, attention deficit disorder, and visual impairments.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FUnderstanding%20your%20users%7C9D4AF228-472F-4F50-AB48-B752602629B0%2F%29"},
      "3":{title:"Research Skills", prereq: "Project Management", blurb: " This node will help you to develop the knowledge needed to conduct the research that will underpin your project. This includes key elements of research, such as, the role of research in the design process, primary vs. Secondary research, the difference between academic and market research, and how to most effectively approach the research process.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FResearch%20Skills%7CFFEE8728-FA8E-4FF2-AFA9-75985078639D%2F%29"},
      "13":{title:"Prototyping", prereq: "Completion of a minimum of 3 Theories Nodes.", blurb: "This node will help you to develop the understanding needed to develop a prototype. This will include key topics such as 3D modelling, use of CAD software, how to research parts and materials, and creating to prototype budget.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FPrototyping%7C6EBB4C99-695C-3042-AC36-79C64A408968%2F%29"},
      "14":{title:"Presenting your idea", prereq: "Prototyping", blurb: "This node includes the key information you need to know about how to communicate an idea effectively. You will cover topics including communication skills, use of narrative and stories, creating value proposition and key messages to communicate your USP, and creating an elevator pitch and presentation deck. ", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FPresenting%20your%20idea%7C5378874D-5D02-C643-AA9F-E834DA11FC0D%2F%29"},
      "2":{title:"Project Management", prereq: "Working Effectively", blurb: "This node includes an overview of how to effectively plan and deliver a successful project. You will cover essential topics including time management, the use of milestones in project planning, budgeting, the importance of risk assessments, and how to effectively evaluate a project. ", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FProject%20Management%7C563C5592-9CB9-41C4-AD38-B179A49D252F%2F%29"},
      "50":{title:"Theories", prereq: "Understanding your Users", blurb: "Complete at least 3 of the following theory nodes (coloured in grey)", url:"N/A"},
      "6":{title:"Art", prereq: "Understanding your Users", blurb: " This node will help you to develop an understanding of the importance of art and the role it plays in city planning. You will develop knowledge relating to colour theory, art in public spaces, and the meaning and application of aesthetics.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FArt%7C281E0130-551A-432C-B001-51C5D37390BC%2F%29"},
      "7":{title:"Product Design ", prereq: "Understanding your Users", blurb: "This node is an introduction on how to design products that communicate and are engaging to different users. You will learn how light, colour, shapes, and structure are key components when designing, inclusive and immersive products, as well as, a better understanding of user-testing for product development. ", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FProduct%20Design%7C14FA167E-FBA1-4684-981A-52E50F7ADBA6%2F%29"},
      "8":{title:"Psychology", prereq: "Understanding your Users", blurb: "This node will include an overview on how different design attributes (colour, structure, sensory, design) are perceived and understood by the human mind. You will learn theoretical knowledge about the psychology of colour, sensory and perceptual processing, and how technology affects our cognition.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FPsychology%7C60452B78-CFB8-4F9F-A86A-8B439F07BF7D%2F%29"},
      "9":{title:"Public Health", prereq: "Understanding your Users", blurb: "This node will provide an introductory overview of the role that colour, light, shape and design plays in public health and wellbeing. You will gain a better understanding on how to design public spaces that are engaging, inclusive and accessible, for different groups in society, with a particular focus on those living with mental health conditions, dementia, visual impairments, and autistic disorder spectrum.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FPublic%20Health%7C09E7F66F-FA60-4830-B6AD-5ACC6DC60845%2F%29"},
      "10":{title:"City Planning", prereq: "Understanding your Users", blurb: "This node will include an overview of city planning and creating a structure for a public space. You will learn about the basic principles of architecture, urban development and city planning, multi-sensory public experiences, and how city designers use structures to build communities.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FCity%20Planning%7C692A10E8-98F3-4FCB-A043-75960D36ED17%2F%29"},
      "11":{title:"S.T.E.M", prereq: "Understanding your Users", blurb: "This node will include an overview of the engineering and physics behind structures, light and colour. You will learn about the manipulation of materials, construction, and the mathematics in engineering. ", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FSTEM%7C8413B7E7-6EF1-412B-8921-D57EAEAEE376%2F%29"},
      "12":{title:"Sustainability", prereq: "Understanding your Users", blurb: "This node includes an overview of the essential information you need to know about technology, materials, and resources for sustainability. You cover key topics relating to sustainability such as developments in modern materials, resources and energy, technology, environmental science, and managing sustainability in a global context.", url:"https://tedilondon.sharepoint.com/sites/ThinkingAhead/_layouts/OneNote.aspx?id=%2Fsites%2FThinkingAhead%2FSiteAssets%2FThinking%20Ahead%20Notebook&wd=target%28_Collaboration%20Space%2FLearning%20Content%20Notebook.one%7CB5D32CAC-81BB-4D21-9324-12C588B3674F%2FSustainability%7CE94A47FE-EEE9-44C9-9501-07A44CC70B3B%2F%29"},
      "0":{title:"Start", prereq: "None", blurb: "This is the start point for the learning tree. Click on working effectively to begin.", url:"N/A"}

    }

    //Node Data for the learning tree network
    var nodesArray = [
    { id: 4, label: "User-centred \n design", level: 4, group: 100,  project: 4, x:0, y:0, font: '16px verdana black' },
    { id: 1, label: "Working \n Effectively", level: 1, group: 100,  project: 2, x:0, y:0, font: '16px verdana black'},
    { id: 5, label: "Understanding \n your users", level: 5, group: 100,  project: 2, x:0, y:0, font: '16px verdana black' },
    { id: 3, label: "Research\n Skills", level: 3, group: 100,  project: 2, x:0, y:0, font: '16px verdana black' },
    { id: 13, label: "Prototyping", level: 7, group: 100,  project: 2, x:100, y:-4, font: '16px verdana black' },
    { id: 50, label: "Theories ", level: 6, group: 100, project: 2, shape: "box", x:0, y:0, font: '20px verdana black' },
    { id: 6, label: "Art", level: 6, group: 4, project: 2, x:0, y:0, font: '16px verdana black' },
    { id: 7, label: "Product \n Design ", level: 6, group: 4, project: 2, x:0, y:0, font: '16px verdana black'   },
    { id: 8, label: "Psychology", level: 6, group: 4, project: 2, x:0, y:0, font: '16px verdana black'   },
    { id: 9, label: "Public health", level: 6, group: 4, project: 2, x:0, y:0, font: '16px verdana black' },
    { id: 10, label: "City Planning", level: 6, group: 4, project: 2, x:0, y:0, font: '16px verdana black' },
    { id: 11, label: "S.T.E.M", level: 6, group: 4, project: 2, x:0, y:0, font: '16px verdana black' },
    { id: 12, label: "Sustainability", level: 6, group: 4, project: 2, x:0, y:0, font: '16px verdana black' },
    { id: 14, label: "Presenting \n your idea", level: 8, group: 100,  project: 4, x:0, y:0, font: '16px verdana black' },
    { id: 2, label: "Project \n Management", level: 2, group: 100,  project: 2, x:-1, y:0, font: '16px verdana black' },
    { id: 15,  label: "Employability", level: 9, group: 100, project: 4, x:0, y:0, font: '16px verdana black' },
    { id: 0, label: 'Start', level: 0, shape: 'box', group:100, project: 4, x:-10, y:70, font:{size:30}}
    ];

    //Connections between nodes
    var edgesArray = [
    {from: 0, to: 1, width:3.5, arrows: { to: { enabled: true, type: 'triangle' }}},
    {from: 3, to: 4, width:3.5, arrows: { to: { enabled: true, type: 'triangle' }}},
    {from: 1, to: 2, width:3.5, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 2, to: 3, width:3.5, length: 100, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 13, to: 14, width:3.5, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 4, to: 5, width:3.5, length: 100, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 14, to: 15 , width:3.5, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 5, to: 50, width:3.5, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 6, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 7, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 8, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 9, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 10, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 11, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 12, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}},
    {from: 50, to: 13, width:3.5, length: 200, arrows: { to: { enabled: true, type: 'arrow' }}}


    ];

    //Define the datasets for nodes and edges
    nodes = new vis.DataSet(nodesArray);
    edges = new vis.DataSet(edgesArray);

    //This is here as an additional step for filtering that has been disabled in this view
    const nodesView = new vis.DataView(nodes);

    startNetwork({ nodes: nodesView, edges: edges })

    currentNode = allNodes[0]
    counter = 1000

    //Keyboard Accessibility
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      change = false;

      //Space key to traverse tree
      if(keyName==" "){
        if(counter == 1000){
          counter = 0;
        }

        change = true

        network.selectNodes([currentNode]);


      }

      //Escape key to close modal
      else if(keyName=="Escape"){
        modal.style.display = "none";
      }
      //Enter key to open modal
      else if(keyName=="Enter"){
        console.log("We've hit the enter key")
        console.log("The counter is")
        console.log(counter)
        if(counter == 1000){
          counter = 0

          currentNode = allNodes[0]
          network.selectNodes([currentNode]);
          nodeID = allNodes[0]

        }
        else{
          index = counter - 1
          if(index == -1 ){
            index = 15
          }
          nodeID = allNodes[index]

        }


        var modalcontent = document.getElementById("modal-content")
        var text = ""
        if(nodeID==50){

          var html = text.concat("<p><b>", nodeData[nodeID].title,
          "</b> <br> ",  nodeData[nodeID].blurb,
        " <br>Pre-requisite Understanding: ", nodeData[nodeID].prereq )

        }
        else if(nodeID==0){
          var html = text.concat("<p><b>", nodeData[nodeID].title,
          "</b> <br> ",  nodeData[nodeID].blurb,
        " <br>Pre-requisite Understanding: ", nodeData[nodeID].prereq )

        }
        else{
          var html = text.concat("<p> Node: <b>", nodeData[nodeID].title,
          "</b> <br>Summary: ",  nodeData[nodeID].blurb ,"<p> Node URL: ", "<a href=\"", nodeData[nodeID].url , "\" target=\"_blank\">Learn Now</a>",
        " <br>Pre-requisite Understanding: ", nodeData[nodeID].prereq )

        }


        modalcontent.innerHTML = html
        modal.style.display = "block";

      }

      else{
        console.log("Warning: Invalid key entry.")
      }

      if(change){
        console.log("Does is change here")

        if(counter < 15){ counter = counter + 1; }
        else{ counter = 0 }
        currentNode = allNodes[counter];

      }

    });
