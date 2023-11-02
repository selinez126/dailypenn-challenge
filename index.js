// this is the questions data that you should use, feel free to change the questions data
// for testing purpose
console.log('----index.js working correctly----')

const data = {
  questions: [
      {
          prompt: 'Slowly, over time, have your parents stopped saying your name and started calling you by generic names like "champ", "kiddo", "disappointment", or "buddy"?',
          options: {
              A: "They usually say my name two to five times every sentence to make sure they don't forget it.",
              B: "When I call, they tell me to 'hold on, I need to check your birth certificate.'",
              C: "They usually ask me if I'm calling the wrong number.",
              D: "I never talk to my parents."
          }
      },
      {
          prompt: 'When was the last time your parents expressed disappointment in you?',
          options: {
              A: "Never. I am a paradigm of human excellence.",
              B: "The third time they caught me in a compromising position with a peach.",
              C: "When I asked them for a single bean.",
              D: "When I called them over the phone sobbing, telling them that I miss them and wish they were a larger presence in my life."
          }
      },
      {
          prompt: 'How much of your childhood trauma stems specifically from the way your parents raised you?',
          options: {
              A: "T-trauma? Who has that? Ha. Hahahahahahahahah-",
              B: "My parents are two very nice, gentle people who never really wanted to commit to the responsibilities of childrearing and I suffered for it.",
              C: "Let's not talk about it.",
              D: "I was raised as an upstanding, moral individual thanks to the occasional spanking."
          }
      },
      {
          prompt: 'Do you often dream of your mother giving you a nice, warm sponge bath, as if your brain is craving maternal comfort?',
          options: {
              A: "Yes, but it is my father who is doing the sponging.",
              B: "No, I do not dream because I cannot fall asleep at night because I worry that my parents hate me.",
              C: "Yes, except I wasn't dreaming, and I was, in fact, remembering the last night I spent time with my mother before returning to school.",
              D: " I'm allergic to sponges, so this is not a dream, but a nightmare."
          }
      },
      {
          prompt: "If you were asked to identify the sound of your father's voice, would you be able to do it?",
          options: {
              A: "No, because my father's voice is identical to that of James Earl Jones and I think every man sounds like James Earl Jones.",
              B: "No, because my father has a medical condition that does not allow him to speak.",
              C: "No, because I have not talked to my father since I left home.",
              D: "No, because my father is a chronic smoker, smokes twenty cigarettes a day, and as a result his voice becomes more unrecognizable with every passing day."
          }
      },
      {
          prompt: "If you do not call your parents, will they ever call you?",
          options: {
              A: "No.",
              B: "No.",
              C: "No.",
              D: "No.",
          }
      },
  ],
  results: [
      "Your parents don't miss you and just feel obligated to talk to you when they call. You are a nuisance in their life and a constant drain on their financial resources. You're the reason they weren't able to go to Cancun this year, and you should be ashamed of it.",
      "Your parents don't miss you and just feel obligated to talk to you! You are their greatest disappointment, and you will never live up to the high expectations set by your older sibling. You will forever live in their shadow, and your parents will leave everything to your high-achieving sibling and will only leave you one bean.",
      "Your parents feel obligated to talk to you, but still love you. They are just rediscovering themselves in their old age and deserve the time to do so. They'll always be there for you, and are your biggest supporters. I hope you give them the chance to do so.",
      "Your parents don't miss you, and you are in fact a horrible person. Your parents are right to disown you. I am sorry, but you will need to put yourself up for adoption right now.",
  ]
}

// Write your code below...

$(document).ready(function(){

    // function to create all HTML quiz elements
    function displayQuiz(questionArr){

        // loop through to append all the question objects onto div
        for(let i = 0; i < questionArr.length; i++){

            // append prompt
            var promptText = $("<p>");
            promptText.html(i + 1 + ". " + questionArr[i].prompt);
            promptText.addClass("aPrompt");
            $(".container").append(promptText);
            
            // convert all properties of options object into arrays of their values and keys
            var allValues = Object.values(questionArr[i].options);
            var allKeys = Object.keys(questionArr[i].options)

            // loop through to display all the options for each question
            for (let j = 0; j < allValues.length; j++){

                // create checkbox and assign question class, answer class, and id
                var checkbox = $("<input type='checkbox'>");
                checkbox.addClass("q" + i);
                checkbox.addClass("a" + j);
                checkbox.attr("id", "q" + i + "a" + j);

                // append checkbox to label, then append label to container
                var option = $("<label>");
                option.attr("id", "labelq" + i + "a" + j);
                option.attr("for", checkbox.attr("id"));
                option.addClass("labelq" + i);
                option.append(checkbox);
                option.append(" " + allKeys[j] + ": " + allValues[j]);
                $(".container").append(option);
            }
        }

        // create button for submission
        var submit = $("<button>");
        submit.text("Show me my results!");
        submit.attr("tabindex", "-1");
        $(".container").append(submit);
    }

    // call displayQuiz function on data's array of question objects
    displayQuiz(data.questions);

    // display hover appearance or not
    $("label").hover(function() {
        $(this).toggleClass("hover");
    })

    // uncheck options within the same question if another is checked
    $("input:checkbox").change(function(){
        if($(this).is(":checked")){
            var theClass = $(this).attr('class').split(' ')[0];
            $("." + theClass).not(this).prop("checked", false);
    
            // identify corresponding label of checkbox and change appearance when clicked
            var question = ($(this).attr("class").split(' ')[0]).toString()[1];
            var answer = ($(this).attr("class").split(' ')[1]).toString()[1];
            $("#labelq" + question + "a" + answer).addClass("click");
            $(".labelq" + question).not("#labelq" + question + "a" + answer).removeClass("click");
        }
        else {
            var question = ($(this).attr("class").split(' ')[0]).toString()[1];
            var answer = ($(this).attr("class").split(' ')[1]).toString()[1];
            $("#labelq" + question + "a" + answer).removeClass("click");
        }
    })

    // default values for number of boxes checked and state of button
    var boxesChecked = 0;
    $("button").prop("disabled", true);

    // button is disabled/enabled based on whether all questions are answered
    $("input:checkbox").change(function(){
        boxesChecked = $("input:checkbox").filter(":checked").length;

        if (boxesChecked < data.questions.length){
            $("button").prop("disabled", true);
        }

        else{
            $("button").prop("disabled", false);

            // default submission state
            var submitted = false;

            // what happens after button clicked during each state
            $("button").click(function(){

                // unbinds previous hover function
                $("label").unbind('mouseenter mouseleave');
    
                // if just now submitted, calculate which response has most responses to determine result
                if (submitted === false){

                    // disable all checkboxes
                    $("input:checkbox").prop("disabled", true);
                    
                    // remove any previous results shown
                    $("#displayResult").remove();

                    // change text displayed in button
                    $("button").text("Retake Quiz");
    
                    // algorithm to determine which letter has most responses
                    var count = 0;
                    var mostCount;
                    for(let j = 0; j < data.results.length; j++){
                        if($(".a" + j).filter(":checked").length > count){
                            count = $(".a" + j).filter(":checked").length;
                            mostCount = j;
                        }
                    }
    
                    // append determined result in parts
                    var result = $("<div>");
                    result.attr("id", "displayResult");

                    var exclamation = $("<p>");
                    exclamation.attr("id", "exclamationId");
                    exclamation.text("Congratulations!");

                    var message = $("<p>");
                    message.attr("id", "messageId");
                    message.html(data.results[mostCount]);

                    result.append(exclamation);
                    result.append(message);
                    $(".container").append(result);

                    // changes submission state (i.e. show it's just been clicked)
                    submitted = true;

                    return;
                }
                
                // if submission has already happened, the next click will be to reset
                else {

                    // change text displayed in button
                    $("button").text("Show me my results!");

                    // emable all checkboxes and remove results displayed
                    $("input:checkbox").prop("disabled", false);
                    $("#displayResult").remove();

                    // allow hover appearance again
                    $("label").hover(function() {
                        $(this).toggleClass("hover");
                    })

                    //change state of submission and button
                    submitted = false;

                    return;
                }
            });
        }
    });
});