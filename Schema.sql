+-----------------------+         +-----------------+
|      RecordingEvent    |         |     User        |
+-----------------------+         +-----------------+
| event_id (PK)          |         | user_id (PK)    |
| event_time             |1    (one)| username        |
| temperature_reading    |---------| password        |
| pH_reading             |1    (one)| email           |
+-----------------------+         +-----------------+



//This schema shows the two entities that we are setting up to be recorded and stored (Temperature and pH)
//The tables on the left depict the event that reads the  temperature and pH, and the tables on the right 
is where user login information is stored for authentication. this info will be hashed and salted
//temperature and pH have a one to one relationship