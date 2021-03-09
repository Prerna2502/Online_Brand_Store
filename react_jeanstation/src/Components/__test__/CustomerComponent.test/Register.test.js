import Register from '../../CustomerComponents/Register/Register'
import Link from 'react-router-dom'
import enzyme,{shallow,mount,render} from 'enzyme'
describe("Register Component testing",()=>{
    const wrapper=shallow(<Register/>)
    it("check Register contain class registerForm",()=>{
        expect(wrapper.find('div.registerForm')).toBeTruthy();
    });

    it("check Register contain button to Register",()=>{
        expect(wrapper.find(<button type="submit" className="btn btn-primary">Register</button>)).toBeTruthy();
    });

    it("check Register contain div with registerForm",()=>{
        expect(wrapper.find('div.registerForm')).toBeTruthy();
    });


    it("check Registered contain div with form-group class",()=>{
        expect(wrapper.find('div.form-group')).toBeTruthy();
    });
})