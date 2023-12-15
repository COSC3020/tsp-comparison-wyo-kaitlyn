[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13141634&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

## Answer

To do these tests I combined my algorithms into one file, and then created a bunch
of graphs to do the empirical analysis.  

I found the input size did not have that much effect on the runtime of Held-Karp until
it hit an input size of 20, at which point the runtime became absurd (I started it last
night and it was still going, so I just had to end it).  On the other hand, Local Search
seemed to remain relatively consistent in runtime, at the expense of length accuracy.

Held-Karp will always be equal or less then the tour length of Local Search because it searches
for the shortest possible length, while my Local Search will iterate until it sees no improvement,
so it won't get the optimal solution.  I noticed while running the tests that Local Search also 
can end up with different lengths for the same graph, so if you wanted to use this algorithm 
more consistently you could potentially run it a certain number of times and take the best result 
from those times.
