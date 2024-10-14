---
title: SWE | Structural Patterns
description: List of various structural patterns.
date: 2024-03-24
categories: [Notes]
tags: [SWE patterns]
---
## List of Structural Patterns
- Adapter
- Bridge
- Composite
- Decorator
- Facade
- Flyweight
- Proxy

## Adapter/Wrapper

### Intent
Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.

### Applicability
Use the Adapter pattern when:
- you want to use an existing class, and its interface does not match the one you need.
- you want to create a reusable class that cooperates with unrelated or unforeseen classes, that is, classes that don't necessarily have compatible interfaces.
- (object adapter only) you need to use several existing subclasses, but its impractical to adapt their interface by subclassing everyone. An object adapter can adapt the interface of its parent class.

### Results
Two different types of adapters, Class & Object.

#### Class Adapter Results
- adapts Adaptee to Target by committing to a concrete Adaptee class. As a consequence, a class adapter won't work when we want to adapt a class *and* all its subclasses.

#### Object Adapter Results
- lets a single Adapter work with many Adaptees -- that is, the Adaptee itself and all of its subclasses (if any). The adapter can also add functionality to all adaptees at once.
- Makes it harder to override Adaptee behavior. It will require subclassing Adaptee and making Adapter refer to the subclass rather than the Adaptee itself.

#### Results
Consequences (good and bad) that both are relevant:
- How much adapting does Adapter Do?
	- Adapters vary in the amount ofwork they do to adapt Adaptee to the Target interface. There is a spectrum of possible work, from simple interface conversion—for example,changing the namesof operations—to supporting an entirely different set of operations. The amount of work Adapter does depends on how similar the Target interface is to Adaptee's.
- Pluggable Adapters
	- Making the adapters fit into an existing system.
- Using two-way adapters to provide transparency.

## Bridge Pattern

### Intent
Decouple an abstraction from its implementation so that the two can vary independently.

### Applicability
Use the Bridge pattern when:
- you want to avoid a permanent binding between an abstraction and its implementation. This might be the case, for example, when the implementation must be selected or switched at run-time.
- both the abstractions and their implementations should be extensible by subclassing. In this case, the bridge pattern lets you combine the different abstractions and implementations and extend them independently
- Changes in the implementation of an abstraction should have no impact on clients; that is, their code should not have to be recompiled.
- (C++) you want to hide the implementation of an abstraction completely from clients. In C++ the representation of a class is visible in the class interface.
- You have a proliferation of classes. 
- You want to share an implementation among multiple objects (perhaps using reference counting), and this fact should be hidden from the client. 

### Results
1. Decoupling interface and implementation.
2. Improved extensibility
3. Hiding Implementation details from clients

## Composite Pattern

### Intent
Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

### Applicability
Use the Composite pattern when:
- you want to represent part-whole hierarchies of objcts.
- you want clients to be able to ignore the difference between compositions of objects and individual objects. Clients will treat all objects in the composite structure uniformly.

### Results
- defines class hierarchies consisting of primitive objects and composite objects. Primitive objectscan be composed into more complex objects, which in turn can be composed, and so on recursively.Wherever client code expects a primitive object, it can also take a composite object
- makes the client simple. Clients can treat composite structures and individual objects uniformly. Clients normally don't know (and shouldn't care) whether they're dealing with a leaf or a composite component. This simplifies client code, because it avoids having to write tag-and-case-statement-style functions over the classes that define the composition.
- makes it easier to add new kinds of components. Newly defined Composite or Leaf subclasses work automatically with existing structures and client code. Clients don't have to be changed for new Component classes.
- can make your design overly general. The disadvantage of making it easy to add new components isthat it makes it harder to restrict the components of a composite. Sometimes you want a composite to have only certain components. WithComposite, you can't rely on the type system to enforce those constraints for you. You'll have to use run-time checks instead.

## Decorator Pattern

### Intent
Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

### Applicability
Use Decorator:
- to add responsibilities to individual objects dynamically and transparently, that is, without affecting other objects.
- for responsibilities that can be withdrawn.
- when extension by subclassing is impractical. Sometimes a larger number of independent extensions are possible and would produce an explosion of subclasses to support every combination. Or a class definition may be hidden or otherwise unavailable for subclassing.

### Results
- More flexibility than static inheritance.
- Avoids feature-laden classes high up in the hierarchy.
- A decorator and its component aren't identical.
- Lots of little objects.

## Facade Pattern

### Intent
Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

### Applicability
Use the Facade pattern when:
- you want to provide a simple interface to a complex subsystem. Subsystems often get more complex as they evolve. Most patterns, when applied, result in more and smaller classes. This makes the subsystem more reusable and easier to customize, but it also becomes harder to use for clients that don't need to customize it. A facade can provide a simple default view of the subsystem that is good enough for most clients. Only clients needing more customizability will need to look beyond the facade.
- There are many dependencies between clients and the implementation classes of an abstraction. Introduce a facade to decouple the subsystem from clients and other subsystems, thereby promoting subsystem independence and portability.
- You want to layer your subsystems. Use a facade to define an entry point to each subsystem level. If subsystems are dependent, then you can simplify the dependencies between them by making them communicate with each other solely through their facades.
- 
### Results
- It shields clients from subsystem componenets, thereby reducing the number of objects that clients deal with and making the subsystem easier to use.
- It promotes weak coupling between the subsystem and its clients. Often the components in a subsystem are strongly coupled. Weak coupling lets you vary the components of the subsystem without affecting its clients. Facades help layer a system and the dependencies between objects. They can eliminate complexor circulardependencies. This canbe an important consequence when the client and the subsystem are implemented independently.
  Reducing compilation dependencies is vital in large software systems.You want to save time by minimizing recompilation when subsystem classes change. Reducing compilation dependencies with facades can limit the recompilation needed for a small change in an important subsystem. A facade can also simplify porting systems to other platforms, because it's less likely that building one subsystem requires building all others.
- It doesn't prevent applicationsfrom using subsystem classes if they need to. Thus you can choose between ease of use and generality.

## Flyweight

### Intent
Use sharing to support large numbers of fine-grained objects efficiently.

### Applicability
The Flyweight pattern's effectiveness depends heavily on how and where it's used. Apply the Flyweight pattern when allof the followingare true:
- An application uses a large number of objects.
- Storage costs are high because of the sheer quantity of objects.
- Most object state can be made extrinsic
- Many groups of objects may be replaced by relatively few shared objects once extrinsic state is removed.
- The application doesn't depend on object identity. Since flyweight objects may be shared, identity tests will return true for conceptually distinct objects.

### Results
Flyweights may introduce run-time costs associated with transferring, finding, and/or computing extrinsic state, especially if it was formerly stored as intrinsic state. However, such costs are offset by space savings, which increase as more flyweights are shared. Storage savings are a function of several factors: • the reduction in the total number of instances that comes from sharing • the amount of intrinsic state per object 200 STRUCTURAL PATTERNS CHAPTER 4 • whether extrinsic state is computed or stored. The more flyweights are shared, the greater the storage savings. The savings increase with the amount of shared state. The greatest savings occur when the objects use substantial quantities of both intrinsic and extrinsic state, and the extrinsic state can be computed rather than stored. Then you save on storage in two ways: Sharing reduces the cost ofintrinsic state, and you trade extrinsic state for computation time. The Flyweight pattern is often combined with the Composite (163) pattern to represent a hierarchicalstructure as a graph with shared leaf nodes. A consequence of sharing isthat flyweightleaf nodes cannot store a pointerto their parent.Rather, the parent pointer is passed to the flyweight as part of its extrinsic state. This has a major impact on how the objects in the hierarchy communicate with each other
## Proxy Pattern

### Intent
Provide a surrogate or placeholder for another object to control access to it.

### Applicability
Proxy is applicable whenever there is a need for a more versatile or sophisticated reference to an object than a simple pointer. Here are several common situations in which the Proxy pattern is applicable:
1. A remote proxy provides a local representative for an object in a different address space. NEXTSTEP [Add94]usesthe class NXProxy for this purpose. Coplien [Cop92]calls this kind of proxy an "Ambassador." 
2. A virtual proxy creates expensive objects on demand. The ImageProxy described in the Motivation is an example of such aproxy. 
3. A protection proxy controls access to the original object. Protection proxies are useful when objects should have different access rights. For example, PROXY 209 KernelProxies in the Choices operating system [CIRM93] provide protected access to operating system objects. 
4. Asmart reference is a replacement for a bare pointerthat performs additional actions when an object is accessed. Typicaluses include:
	 - counting the number of references to the real object so that it can be freed automatically when there are no more references (also called smart pointers [Ede92]). 
	 - loading a persistent object into memory when it's first referenced.
	 - checking that the real object is locked before it's accessed to ensure that no other object can change it.

### Results
The Proxy pattern introduces a level of indirection when accessing an object. The additional indirection has many uses, depending on the kind of proxy: 1. A remote proxy can hide the fact that an object resides in a different address space. 2. A virtual proxy can perform optimizations such as creating an object on demand. 3. Bothprotection proxies and smart references allow additional housekeeping tasks when an object is accessed. There's another optimization that the Proxy pattern can hide from the client. It's called copy-on-write,and it's related to creation on demand. Copying a large and complicated object can be an expensive operation. If the copy is never modified, then there's no need to incur this cost. Byusing a proxy to postpone the copying process, we ensure that we pay the price of copying the object only ifit's modified. To make copy-on-write work, the subjectmust be reference counted. Copying the proxy will do nothing more than increment this reference count. Only when the client requests an operation that modifiesthe subjectdoes the proxy actuallycopy it. In that case the proxy must also decrement the subject's reference count. When the reference count goes to zero, the subject gets deleted. PROXY 211 Copy-on-write can reduce the cost of copying heavyweight subjects significantly.

Proxy to share paths of a file.

Making software to do:
1. Detect 2 kinds of objects from given images
2. Double check a potential detected object with checklist
3. Approximate location of Object
4. Send location to another system
5. Send signal to another system

While ensuring the software is as module as possible. For example if one person in the future figures out a better way to approximate location, then there implementation can have an easier time to replace previous implementation without changing the commands used by the rest of the scripts. 

To note:
- Bridge Pattern should be considered for implementation, if the new year's rulebook has a variant version of a previous object.
