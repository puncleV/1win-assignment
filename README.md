#**1WIN TEST ASSIGNMENT**

###Conditions
You have a microservice architecture and lets say you have a data source with sport odds which will send you data via RabbitMQ with two message types:

    Odds data message:
```text
[
    {
      group: number,
      odds: [number, number],
    },
    ...
]
```
   
    Disable group message: 
    
```text
{
  group: number,
  reason: string,
}
```

You don't know list of possible group IDs

###Task
You have to write a backend for an administrator panel to manage a whitelist for odds groups with next requirements:

1. You have to send Odds data messages into another service (better by rabbitmq, but you could mock it) but only if they are whitelisted
2. It's possible to enable\disable each group
3. By default all new groups should be disabled
4. Admin can't enable\disable group if you have received Disable group message until you read a reason
5. (Optional) add a possibility to run your backend in multiple instances

###Tools and libraries

You are able to use whatever you want but we would like to see:

1. Koa/express similar framework
2. Docker
3. In case of multiple instances we would like to see Reddis

Feel free to contact us and ask any questions before you start

###Estimate

It's pretty simple task so it won't take longer then 4 hours
