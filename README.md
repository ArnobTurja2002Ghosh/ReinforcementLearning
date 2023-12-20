# ReinforcementLearning

## Monte Carlo

Sudharsan Ravichandiran

Hands-On-Reinforcement-Learning-With-Python

Ravichandiran used v0: Initial versions release (1.0.0) of blackjack. 
I used v1.

## Q-learning

### Exploitation vs Exploration

- One of the main challenges in RL is the tradeoff between exploitation and exploration.

  They are the two birds (দুই পাখি) of Rabindranath Tagore. The poem starts something like this:
~~~
  খাঁচার পাখি ছিল     সোনার খাঁচাটিতে

                   বনের পাখি ছিল বনে।

একদা কী করিয়া     মিলন হল দোঁহে,

        কী ছিল বিধাতার মনে।
~~~
Of course there is something going on in my mind when I am bringing the two birds - one from the luxurious greediness, another from the wild randomness - into one algorithm.

Both of these birds sing - both are guaranteed to return some action - but দোঁহার ভাষা দুইমতো their way of choosing an action are different from each other. The খাঁচার পাখি, which symbolizes exploitation, returns an action based on শিখানো গান what has been taught to it about every action in a given state. On the other hand, the symbol of exploration - our বনের পাখি বলে-- না, আমি শিখানো গান নাহি চাই does not even want to know the values of the actions - it randomly chooses an action. Exploitation খাঁচার পাখি বলে-- "হায়, আমি কেমনে বন-গান গাই।' cannot return a random action. Exploration has no restriction in choosing an action বনের পাখি বলে, "আকাশ ঘননীল, কোথাও বাধা নাহি তার।' it has equal probability to choose every action. The action from exploitation is very predictable; it is bound to choose the action that has the maximum value in the state. Exploitation can never select an action beyond the one that has the maximum value সেথা কোথায় উড়িবারে পাই! although exploration does have some probability to randomly choose a greedy action. There is a harmony between these two birds এমনি দুই পাখি দোঁহারে ভালোবাসে তবুও কাছে নাহি পায়। but they cannot work at the same time in choosing an action from a particular state. Between every iteration খাঁচার ফাঁকে ফাঁকে touching just by the boundary set by epsilon পরশে মুখে মুখে, নীরবে চোখে চোখে চায়। each keeps selecting an action in its own way. They are working together in selectActionFromPolicy yet দুজনে একা একা ঝাপটি মরে পাখা in a particular iteration each bird is so alone in deciding an action. Exploration is always random because of its scepticism towards future; in a dynamic environment the state followed by carrying out a greedy action may become really punishing কবে খাঁচার রুধি দিবে দ্বার; exploitation is always upto Math.max simply because মোর শকতি নাহি উড়িবার Math.random is not its thing.
