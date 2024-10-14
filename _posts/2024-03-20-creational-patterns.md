---
title: SWE | Creational Patterns
description: List of various creational patterns.
date: 2024-03-20
categories: [Notes]
tags: [SWE patterns]
---

## List of creational patterns:
- Abstract Factory
- Builder
- Factory Method
- Prototype
- Singleton


## Abstract Factory Pattern

### Intent
Provide an interface for creating families of related or dependent objects without specifying their classes.

### Applicability
Use Abstract factory pattern when
- a system should be independent of how its products are created, composed, and represented
- a system should be configured with one of multiple families of products
- a family or related product objects is designed to be used together, and you need to enforce this constraint
- you want to provide a class library of products, and you want to reveal just their interfaces, not their implementations

### Results
- Isolates concrete classes
- makes exchanging product families easy
- promotes consistency among products
- Supporting new kinds of products is difficult.
	- Can be remedied using prototype pattern, if new product is similar to existing products/concrete classes.
	- Some languages (Smalltalk and Objective C, for example) may have language characteristics that can solve the problem of creating new kinds of products.

## Builder Pattern

### Intent
Separate the construction of a complex object from its representation so that the same construction process can create different representations.

### Applicability
Use the Builder pattern when:
- the algorithm for creating a complex object should be independent of the parts that make up the object and how they're assembled.
- the construction process must allow different representations for the object that's constructed.

### Results
- Lets you vary a product's internal representation.
- Isolates code for construction and representation.
- gives finer control over the construction process


## Factory Method Pattern

### Intent 
Define an interface for creating an object, but let subclasses decide which classes to instantiate. Factory Method lets a class defer instantiation to subclasses

### Applicability
Use the Factory Method pattern when:
- a class can't anticipate the class of objects it must create.
- a class wants its subclasses to specify the objects it creates.
- classes delegate responsibility to one of several helper subclassses, and you want to localize the knowledge of which helper subclass is the delegate.

### Results
- Provides hooks for subclasses
- Connects parallel class hierarchies.


## Prototype Pattern

### Intent
Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.

### Applicability
Use the Prototype pattern when a system should be independent of how its products are created, composed, and represented; and:
- when the classes to instantiateare specified at run-time, for example, by dynamic loading; or
- to avoid building a class hierarchy of factories that parallels the class hierarchy of products; or
- when instances of a class can have one of only a few different combinations of state. It may be more convenient to install a corresponding number of prototypes and clone them rather than instantiating the class manually, each time with the appropriate state.

### Results
- Adding and Removing products at run-time.
- Specifying new objects by varying values.
- Specifying new objects by varying structure.
- Reduced subclassing.
- Configuring an application with classes dynamically

## Singleton Pattern

### Intent
Ensure a class only have one instance, and provide a global point of access to it.

### Applicability
Use the Singleton pattern when:
- There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point
- When the sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code.

### Results
- Controlled access to sole instance.
- Reduced name space.
- Permits refinement of operations and representation.
- Permits a variable number of instances.
- More flexible than class operations.

