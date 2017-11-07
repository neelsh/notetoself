import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });


describe('App', () => {
  let app = mount(<App />);


  it('renders the App title', () => {
    // console.log(app.debug())
    expect(app.find('h2').text()).toEqual('Note to self')
  });

  it('renders the Clear button', () => {
    expect(app.find('.btn').at(1).text()).toEqual('Clear notes')
  });

  describe('when rendering the form', () => {
    it('creates a Form component', () => {
      expect(app.find('Form').exists()).toBe(true)
    });

    it('renders a FormControl component', () => {
      expect(app.find('FormControl').exists()).toBe(true)
    });

    it('renders a Submit button', () => {
      expect(app.find('.btn').at(0).text()).toEqual('Submit')
    });
  });

  describe('when creating a note', () => {
    let testNote = 'test note';

    beforeEach(() => {
      app.find('FormControl').simulate('change', {
        target: { value: testNote }
      })
    });

    it('updates the text in state', () => {
      expect(app.state().text).toEqual(testNote);
    });

    describe('submitting a new note', () => {
      beforeEach(() => {
        app.find('.btn').at(0).simulate('click');
      });

      afterEach(() => {
        app.find('.btn').at(1).simulate('click')
      });

      it('adds the new note to state', () => {
        // console.log(app.state());
        expect(app.state().notes[0].text).toEqual(testNote)
      });

      describe('remounting the component', () => {
        let app2;

        beforeEach(() => {
          app2 = mount(<App />);
        });

        it('reads the stored note cookies', () => {
          // console.log(app2.state());
          expect(app2.state().notes).toEqual([{ text: testNote }])
        })
      });

      describe('and clicking the clear button', () => {
        beforeEach(() => {
          app.find('.btn').at(1).simulate('click');
        });

        it('deletes the notes in the state', () => {
          expect(app.state().notes).toEqual([]);
        })
      });
    });
  });

})
