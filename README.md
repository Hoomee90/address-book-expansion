# Address Book

#### By **Samantha Callie**, with code from [Epicodus](https://github.com/epicodus-lessons/oop-address-book-v2/tree/8_adding_delete_functionality_and_polish)

#### Keep a book of all the people to address

## Technologies Used

* HTML
* CSS
* BootStrap
* JS

## Description

This site is an interactive Address Book. Users can add contacts to a list, each with their own name, number and any number and type of emails and addresses. Users can also view full details or delete entries by clicking the contact.

## Setup/Installation Requirements

* Clone repository
* Navigate to the top level of the directory
* Open index.html in your browser

## Known Bugs

* Adding contacts with blank form details may lead to unexpected results

## License

[GNU GPLv3](https://choosealicense.com/licenses/agpl-3.0/)

Copyright (c) 2023 Samantha Callie

## Pseudocode Tests Used During Development

Yes this is technically UI logic, but I barely added any of my own Business Logic, so this is the best I could come up with

Describe: handleAddingInputElements()

Test: "It should find the correct container to add input elements to"
Code:
const event = PointerEvent{...target:button.row.email-input};
handleAddingInputElements(event);
!PAUSE!
console.log(inputContainer);
Expected Output: div#email.input-container

Test: "It should create a node clone of the correct container's last child"
Code:
const event = PointerEvent{...target:button.row.email-input};
handleAddingInputElements(event);
!PAUSE!
console.log(inputToClone);
Expected Output: div.row.email-input

Test: "It should append the cloned node to the container"
Code:
const event = PointerEvent{...target:button.row.email-input};
handleAddingInputElements(event);
console.log((document.querySelector("div#email")));
Expected Output: div#email.input-container{div.row.email.input, div.row.email.input}

Test: "The cloned node's input field should be blank"
Code:
const event = PointerEvent{...target:button.row.email-input};
handleAddingInputElements(event);
!PAUSE!
inputToClone.lastElementChild.lastElementChild.value;
Expected Output: ""