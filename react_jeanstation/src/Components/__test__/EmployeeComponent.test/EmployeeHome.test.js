import EmployeeHome from '../../EmployeeComponents/EmployeeHome/EmployeeHome'
import enzyme,{shallow} from 'enzyme'
import { Link } from 'react-router-dom'
describe("EmployeeHome Component testing",()=>{
    const wrapper=shallow(<EmployeeHome/>)
    it("check AdminHome contain h1 with caption Welcome to Jean-Station Employee Portal.",()=>{
        expect(wrapper.find(<h1 className="cover-heading">Welcome to Jean-Station Employee Portal.</h1>)).toBeTruthy();
    });

    it("check EmployeeHome contain Link to LogIn",()=>{
        expect(wrapper.find(
            <Link to='/employee/log_in' className='btn btn-lg btn-secondary'>Log In</Link>
        )).toBeTruthy();
    });

    it("check EmployeeHome contain p tag",()=>{
        expect(wrapper.find('p')).toBeTruthy();
    });
   
    it("check EmployeeHome contain main with inner class",()=>{
        expect(wrapper.find('main.inner')).toBeTruthy();
    });
})