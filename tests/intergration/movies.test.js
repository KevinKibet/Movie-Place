  
let server;
const request = require('supertest');
const Movies = require('../../models/movie.js');


   describe('/movies', ()=>{

   	beforeEach(()=>{
   		server = require('../../app');
   	});
   	afterEach(()=>{
   		server.close();
   		Movies.remove({});
   	})

      describe('/GET', ()=>{
        it('should return all movies', async ()=>{
        Movies.collection.insertMany([
               {
        	  title: 'title1',
              genre:'genre1',
              plot:'plot1',
              director:'diector1',
              trailer:'trailer1',
              cover:'cover1'
              
        },
        {
        	  title: 'title2',
              genre:'genre2',
              plot:'plot2',
              director:'diector2',
              trailer:'trailer2',
              cover:'cover2'
              
        }
             
        	]);
        
     const res = await  request(server).get('/movies');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body.some(m => m.title === 'title1')).toBeTruthy();
         expect(res.body.some(m => m.title === 'title2')).toBeTruthy();
        });

      }) ;
     
     describe('/GET:id', ()=>{

     	it('should return a movie given a valid id',async()=>{
        const movie = new Movies({
        	  title: 'title1',
              genre:'genre1',
              plot:'plot1',
              director:'diector1',
              trailer:'trailer1',
              cover:'cover1'
              
        });

       await movie.save();

        const res =   request(server).get('/movies/details/'+movie._id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('title', movie.title);

     	})




     	it('should return 404 when invalid id is passed',async()=>{
        
        const res =   request(server).get('/movies/details/1');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('title', movie.title);

     	})
     })

   });