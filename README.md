# Meteor-Tycho
Event sourcing Astronomy for Meteor

## Overview
This is an experimental package to extend the work in jagi:astronomy to accommodate an event sourcing approach to managing current state.  The general idea is that for a given model, all changes are captured as a stream of recorded events.  The current state is calculated by processing this event stream.  Not only current state, but in fact the state at any point in time may be revisited.  The goal is to build a base class that has this core behaviour added, but remains flexible enough to be adapted to a wide range of use cases.

## Event Sourcing
todo


## What's up with the name?
[Tycho Brahe](https://en.wikipedia.org/wiki/Tycho_Brahe) was a 16th century Danish nobleman and astronomer. He was known for his accurate and comprehensive astronomical observations, and has been described more recently as "the first competent mind in modern astronomy to feel ardently the passion for exact empirical facts."  These observations are what Johannes Kepler used to derive his three laws of planetary motion.

I use Brahe's work as an analogy for the importance of event sourcing: with accurate and comprehensive records of events, we can later construct and reconstruct materializations of what our current state should be - which happen to be expressed as Astronomy models.
