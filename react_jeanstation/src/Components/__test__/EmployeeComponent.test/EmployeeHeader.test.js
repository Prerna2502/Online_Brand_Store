import EmployeeHeader from '../../EmployeeComponents/EmployeeHeader/EmployeeHeader'
import enzyme,{shallow} from 'enzyme'
import { Link } from 'react-router-dom'
describe("AdminHome Component testing",()=>{
    const wrapper=shallow(<EmployeeHeader/>)
    it("check EmployeeHeader cotain Link for Stocks",()=>{
        expect(wrapper.find(<Link to='/employee/stock'>Stocks</Link>)).toBeTruthy();
    });

    it("check EmployeeHeader contain Link to Log In",()=>{
        expect(wrapper.find(
            <Link to='/employee/log_in' className='nav-item'>Log In</Link>
        )).toBeTruthy();
    });

    it("check EmployeeHeader contain Link for Orders",()=>{
        expect(wrapper.find(<Link to='/admin/orders'>Orders</Link>)).toBeTruthy();
    });
   
    it("check EmployeeHeader contain Link for Home",()=>{
        expect(wrapper.find( <Link to='/admin/' className='nav-item'>Home</Link>)).toBeTruthy();
    });
})