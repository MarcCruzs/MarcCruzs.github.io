---
title: SWE | Behavioral Patterns
description: List of various behavioral patterns.
date: 2024-03-24
categories: [Notes]
tags: [SWE patterns]
---

## List of Behavioral Patterns
- Chain of Responsibility
- Command
- Interpreter
- Iterator
- Mediator
- Memento
- Observer
- State
- Strategy
- Template Method
- Visitor

## Chain of Responsibility

### Intent
Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.

### Applicability
Use Chain of Responsibility when:
- more than one object may handle a request, and the handler isn't known a priori. 
- you want to issue a request to one of several objects without specifying the receiver explicitly. 
- the set of objects that can handle a request should be specified dynamically.

### Results
- Reduced coupling
- Added flexibility in assigning responsibilities to objects
- Receipt isn't guaranteed. Since a request has no explicit receiver, there's no guarantee it'll be handled.

## Command pattern

### Intent
Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

### Applicability
Use the command pattern when you want to:
- Parameterize objects by an action to perform
- Specify, queue, and execute requests at different times. A command object can have a lifetime independent of the original request. If the receiver of a request can be represented in an address space-independent way, then you can transfer a command object for the request to a different process and fulfill the request there.
- support undo. The Command's Execute operation can store state for reversing its effects in the command itself.
- support logging changes so that they can be reapplied in case of a system crash.
- structure a system around high-level operations built on primitives operations. Such a structure is common in informationsystems that support transactions. A transaction encapsulates a set of changes to data. The Command pattern offers a way to model transactions. Commands have a common interface, letting you invoke all transactions the same way. The pattern also makes it easy to extend the system with new transactions.

### Results
- Command decouples the objects that invokes the operation from the one that knows how to perform it.
- Commands are first-class objects. They can be manipulated and extended like any other object
- You can assemble commands into a composite command. In general, composite commands are an instance of the Composite pattern.
- It's easy to add new Commands, because you don't have to change existing classes.

## Interpreter Pattern

### Intent
Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

### Applicability
Use the interpreter pattern when there is a language to interpret, and you can represent statements in the language as abstract syntax trees. The Interpreter pattern works best when:
- The grammar is simple. For complex grammars, the class hierarchy for the grammar becomes large and unmanageable. Tools such as parser generators are a better alternative in such cases. They can interpret expressions without building abstract syntax trees, which can save space and possibly time.
- efficiency is not a critical concern. The most efficient interpreters are usually not implemented by interpreting parse trees directly but by first translating them into another form. For example, regular expressions are often transformed into state machines. But even then, the translator can be implemented by the Interpreter pattern, so the pattern is still applicable.

### Results
- Easy to change and extend the grammar.
- Implementing the grammar is easy, too.
- Complex grammars are hard to maintain.
- Adding new ways to interpret expressions.

## Iterator Pattern

### Intent
Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

### Applicability
Use the iterator pattern:
- To access an aggregate object's content without exposing its internal representation.
- To support multiple traversals of aggregate objects.
- To provide a uniform interface for traversing different aggregate structures (that is, to support polymorphic iteration).

### Results
- Supports variations in the traversal of an aggregate.
- Iterators simplify the Aggregate interface.
- More than one traversal can be pending on an aggregate.

## Mediator Pattern

### Intent
Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.

### Applicability
Use the Mediator pattern when:
- a et of objects communicate in well-defined but complex ways. The resulting interdependencies are unstructured and difficult to understand
- reusing an object is difficult because it refers to and communicates with many other objects.
- a behavior that's distributed between several classes should be customizable without a lot of subclassing.

### Results
- It limits subclassing
- It decouples colleagues
- it simplifies object protocols
- It abstracts how objects cooperate
- It centralizes control

## Memento Pattern

### Intent
Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.

### Applicability
Use the Memento pattern when:
- a snapshot of (some portion of) an object's state must be saved so that it can be restored to that state later, *and*
- a direct interface to obtaining the state would expose implementation details and break the object's encapsulation.

### Results
- Preserving encapsulation boundaries.
- It simplifies Originator.
- Using mementos might be expensive
- Defining narrow and wide interfaces.
- Hidden costs in caring for mementos.

## Observer Pattern / publish-subscribe

### Intent
Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### Applicability
Use the Observer pattern in any of the following situations:
- When an abstraction has two aspects, one dependent on the other. Encapsulating these aspects in separate objects lets you vary and reuse them independently.
- When a a change to one object requires changing others, and you don't know how many objects need to be changed.
- When an object should be able to notify other objects without making assumptions about who these objects are. In other words, you don't want these objects tightly coupled.

### Results
- Abstract coupling between Subject and Observer.
- Support for broadcast communication.
- Unexpected updates.

## State Pattern

### Intent
Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

### Applicability
Use the State pattern in either of the following cases:
- An object's behavior depends on its state, and it must change its behavior at run-time depending on that state. 
- Operations have large, multipart conditional statements that depend on the object's state. This state is usually represented by one or more enumerated constants. Often, several operations will contain this same conditional structure. The Statepattern puts each branch ofthe conditional in a separate class. This lets you treat the object's state as an object in its own right that can vary independently from other objects.

## Strategy Pattern

### Intent
Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

### Applicability
Use the strategy pattern when:
- many related classes differ only in their behavior. Strategies provide a way to configure a class with one of many behaviors.
- you need different variants of an algorithm. For example, you might define algorithms reflecting different space/time trade-offs. Strategies can be used when these variants are implemented as a class hierarchy of algorithms.
- an algorithm uses data that clients shouldn't know about. Use the Strategy pattern to avoid exposing complex, algorithm-specific data structures.
- a class defines many behaviors, and these appear as multiple conditional statements in its operations. Instead of many conditionals, move related conditional branches into their own Strategy class.

### Consequences
- Families of related algorithms.
- An alternative to subclassing.
- Strategies eliminate conditional statements.
- A choice of implementations.
- Clients must be aware of different Strategies.
- Communication overhead between Strategy and Context.
- Increased number of objects.

## Template Method Pattern

### Intent
Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.

### Applicability
The Template Method pattern should be used:
- to implement the invariant parts of an algorithm once and leave it up to subclasses to implement the behavior that can vary.
- when common behavior among subclasses should be factored and localized in a common class to avoid code duplication. This is a good example of "refactoring to generalize" as described by Opdyke and Johnson [OJ93]. You first identify the differences in the existing code and then separate the differences into new operations. Finally, you replace the differing code with a template method that calls one of these new operations.
- to control subclasses extensions. You can define a template method that calls "hook" operations at specific points, thereby permitting extensions only at those points.
