# BreadCalculator

This program allows you to create your own bread recipes, calculating all percentages and weights needed. Just add ingredients (categories: Flour, Fluid, Other) and the tool calculates hydration rations and all other percentages. You can also simply type in your desired percentage of the ingredient and the weights will be calculated accordingly. 

![alt text](https://github.com/D-Niermann/BreadCalculator/blob/master/Images/TutImg.png)


## Install

No installation needed, just download the 'BreadCalculator.zip', unpack it and start the .exe.

DOWNLOAD: https://github.com/D-Niermann/BreadCalculator/raw/Release/BreadCalculator-win32.zip



## How To Use
### Principle
I want something that makes it easy for me to create my own recipes without doing all the math myself. I've seen many online calculators or excel spreadsheets, but these are either super ugly or useless since some vital features are missing, e.g. adding more than one pre-ferment. So I created my own application with certain principles in mind:
- Easy to use
- Multiple pre-ferments
- Pretty
- Features that make it easy to set common bread parameters (like total hydration)
### Usage
The Calculator is very easy to use. You add elements (ingredients) to the respective dough list. The percentages of each ingerdient are calculated based on the total flour weight. You can either enter the weight in gram or the desired percentage (e.g. for salt or water) where you want always a fixed percentage.




## Known Issues
- removing the per-ferment list elements in the Main dough is not undo-able! Needs add button
- Adding up percentages over 100% is possible by user input and kinda breaks the calculation (obviously)
