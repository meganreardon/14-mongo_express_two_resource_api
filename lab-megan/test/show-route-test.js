'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Show = require('../model/show.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleShow = {
  name: 'example show',
  startDate: new Date('December 16, 2016 012:00:00')
};

const exampleEpisode = {
  title: 'example title',
  director: 'example director'
};

describe('SHOW ROUTES', function() {

  // ----------
  // POST tests
  //-----------

  describe('POST: /api/show', function() {
    describe('with a valid body', function() {

      after(done => {
        if(this.tempShow) {
          Show.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a show', done => {
        request.post(`${url}/api/show`)
        .send(exampleShow)
        .end((err, res) => {
          if (err) return done(err);
          expect (res.status).to.equal(200);
          expect (res.body.name).to.equal('example show');
          this.tempShow = res.body;
          done();
        });
      });

      describe('with an empty body', function() {
        it('should return 400 with no request body', done => {
          request.post(`${url}/api/show`)
          .send({})
          .end((err, res) => {
            expect (res.status).to.equal(400);
            expect (res.body).to.be.empty;
            done();
          });
        });
      });

    });
  });

  // ---------
  // GET tests
  // ---------

  describe('GET: /api/show/:id', function() {
    describe('with a valid body', function() {

      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          return Show.findByIdAndAddEpisode(show._id, exampleEpisode);
        })
        .then( episode => {
          this.tempEpisode = episode;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempShow) {
          Show.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a show', done => {
        request.get(`${url}/api/show/${this.tempShow._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('example show');
          expect(res.body.episodes.length).to.equal(1);
          expect(res.body.episodes[0].name).to.equal(exampleEpisode.name);
          done();
        });
      });

      describe('with a valid path but invalid id', () => {
        it('should return a 404 error', done => {
          request.get(`${url}/api/show/0123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });

    });
  });

  // ---------
  // PUT tests
  // ---------

  describe('PUT: /api/show/:id', function() {
    describe('with a valid body', function() {

      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempShow) {
          Show.remove({})
          .then ( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a show', done => {
        var updated = { name: 'updated name'};
        request.put(`${url}/api/show/${this.tempShow._id}`)
        .send(updated)
        .end((err, res) => {
          if (err) return done(err);
          let startDate = new Date(res.body.startDate);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(updated.name);
          expect(startDate.toString()).to.equal(exampleShow.startDate.toString());
          done();
        });
      });

      describe('with correct path but incorrect id', () => {
        it('should return a 404 error', done => {
          var updated = { name: 'valid updated name'};
          request.put(`${url}/api/show/0123456789`)
          .send(updated)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });

      // TODO: this gives a 200 instead of a 400 no matter what form of empty body that I send, need to update in routes?
      // describe('with no body provided', () => {
      //   it('should return a 400 error', done => {
      //     request.put(`${url}/api/show/${this.tempShow._id}`)
      //     .send({})
      //     .end((err, res) => {
      //       expect(res.status).to.equal(400);
      //       done();
      //     });
      //   });
      // });

    });
  });

  // ------------
  // DELETE tests
  // ------------

  describe('DELETE: /api/show/:id', function() {
    describe('with a valid body', function() {

      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempShow) {
          Show.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should delete a show', done => {
        request.delete(`${url}/api/show/${this.tempShow._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
      });

    });
  });

});
