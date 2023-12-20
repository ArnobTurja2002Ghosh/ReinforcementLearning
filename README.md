# ReinforcementLearning

## Monte Carlo

Sudharsan Ravichandiran

Hands-On-Reinforcement-Learning-With-Python

Ravichandiran used v0: Initial versions release (1.0.0) of blackjack. 
I used v1.

## Q-learning

### Exploitation vs Exploration

- One of the main challenges in RL is the tradeoff between exploitation and exploration.

  They are the two birds (দুই পাখি) of Rabindranath Tagore. The poem starts like this:
~~~
খাঁচার পাখি ছিল     সোনার খাঁচাটিতে

                   বনের পাখি ছিল বনে।

একদা কী করিয়া     মিলন হল দোঁহে,

        কী ছিল বিধাতার মনে।
~~~
Of course there is something going on in my mind when I am bringing the two birds - one from the luxurious greediness, another from the wild randomness - into one algorithm.

Both of these birds sing - both are guaranteed to return some action - but দোঁহার ভাষা দুইমতো their way of choosing an action are different from each other. The খাঁচার পাখি, which symbolizes exploitation, returns an action based on শিখানো গান what has been taught to it about every action in a given state. On the other hand, the symbol of exploration - our বনের পাখি বলে-- না, আমি শিখানো গান নাহি চাই does not even want to know the values of the actions - it randomly chooses an action. Exploitation খাঁচার পাখি বলে-- "হায়, আমি কেমনে বন-গান গাই।' cannot return a random action. Exploration has no restriction in choosing an action বনের পাখি বলে, "আকাশ ঘননীল, কোথাও বাধা নাহি তার।' it has equal probability to choose every action. The action from exploitation is very predictable; it is bound to choose the action that has the maximum value in the state; you can say that খাঁচাটি পরিপাটি its way of selecting an action is very organised. Exploitation can never select an action beyond the one that has the maximum value সেথা কোথায় উড়িবারে পাই! although exploration does have some probability to randomly choose a greedy action. There is a harmony between these two birds এমনি দুই পাখি দোঁহারে ভালোবাসে তবুও কাছে নাহি পায় but they cannot work at the same time in choosing an action from a particular state. Between every iteration খাঁচার ফাঁকে ফাঁকে touching just by the boundary set by epsilon পরশে মুখে মুখে, নীরবে চোখে চোখে চায় each keeps selecting an action in its own way. They are working together in selectActionFromPolicy yet দুজনে একা একা ঝাপটি মরে পাখা in a particular iteration each bird is so alone in deciding an action. Maybe this separation, this setting of this boundary, is the reason that these two birds love each other instead of being in a conflict, in spite of being so different. If you have read "Sapiens" by Yuval Noah Harari, you will see that humans have a tendency to pick some difference and start war and hatred based on that. According to Schoppenhauer, the solution to this hatred is distance between every human: "The mean distance which they finally discover, and which enables them to endure being together, is politeness and good manners."(Parerga and Paralipomena). In the case of our two birds, the mean distance which our two birds finally discover, and which enables them to endure being together, is set by epsilon. Exploration is always random because of its scepticism towards future; in a dynamic environment the state followed by carrying out a greedy action may become really bad কবে খাঁচার রুধি দিবে দ্বার; exploitation cannot give random action because মোর শকতি নাহি উড়িবার access to Math.random is not given to it. 

In ‘Adhunik Sahitya’ by Rabindranath Tagore, he says that exploitation is feminine and exploration is masculine: 
"There is an independently moving masculine entity within our nature, which is intolerant of  bondage alongside a feminine one which prefers to be enclosed and secured within the walls of the home.
Both of them remain united in an inseparable fashion."

It is not just me who is enforcing the interpretation of exploration-vs-exploitation from this poem, but the writer himself mentions about the বনের পাখি being fond of exploration, and খাঁচার পাখি that requires keeping track of every reward or prejudice from every state and the 'traditional' values of every action a state:
"One is eager to develop significantly his undying strength in diverse ways by savouring ever-new tastes of life, exploring ever-new realms and manifestations, and the other remains encircled within innumerable prejudices and traditional practices, enthralled with her habitual deliberations."

Restless exploration makes you learn the optimal policy by trying all the good and bad actions; bounded exploitation pulls you towards the goal by following a policy.
"One takes you out into the vast expanse and the other seems to pull towards home."

Therefore, exploration and exploitation is comparable to বনের পাখি forest bird and খাঁচার পাখি caged bird respectively:
"One is a forest bird and the other is a caged bird."

By now, due to connotations of words like "feminine", "caged" etc you probably got a negative impression towards exploiation (woah, I just realized that "exploitation" itself is also a negative word). Don't worry, I am not going to accuse you of misogyny because indeed, an optimal policy can form without any exploitation. You may be thinking that how is exploitation contributing to our Q-learning then. What will happen if epsilon=0 - there is no খাঁচার পাখি - no exploitation? Will there be just one bird? This reminds me of a poem by Kabir:
~~~
THERE IS A strange tree, which stands without roots and bears fruits without blossoming;

It has no branches and no leaves, it is lotus all over.

Two birds sing there; one is the Guru, and the other the disciple:
~~~
Look, we eliminated a bird from two birds and still we have two birds! But among Guru and disciple, which one is exploration? 

Disciple. The disciple is the bird that chooses from manifolds of actions. Some actions are sweetly rewarding and some sourly punishing.
~~~
The disciple chooses the manifold fruits of life and tastes them
~~~
In Mandukya Upanishad the disciple is simply called "first bird" that is "feeding on the pleasures and pains of this world".

The Guru is obviously not a part of selectActionFromPolicy. Guru is that part of the algorithm that updates value and policy through watching the disciple taking thoughtless, random actions. In case you think that the guru is probably unhappy to see his disciple being thoughtless and, like some Abrahamic god, angry that the disciple is not following any rule, I would say that the Guru is happy that an optimal policy is formed, thanks to the disciple tolerating all the different, unpredictable tastes of different fruits.
~~~
and the Guru beholds him in joy.
~~~
Yeah, I know, you can see that there indeed is a Guru in Q-learning but you cannot say which part of the code is Guru. In contrast, forest-caged bird was probably easier because you could literally seek selectActionFromPolicy and find two conditional statements and distinguish which one is exploitation or exploration. Guru seems to exist but more abstractly. And it is okay to struggle at this point because the writer himself says:
~~~
What Kabir says is hard to understand: 'The bird is beyond seeking, yet it is most clearly visible. The Formless is in the midst of all forms. I sing the glory of forms.'
~~~
