import AdminHeader from '../../AdminComponents/AdminHeader/AdminHeader'
import enzyme,{shallow} from 'enzyme'
import { Link } from 'react-router-dom'
describe("AdminHome Component testing",()=>{
    const wrapper=shallow(<AdminHeader/>)
    it("check AdminHeader cotain Link for Customers",()=>{
        expect(wrapper.find(<Link to='/admin/customers'>Customers</Link>)).toBeTruthy();
    });

    it("check AdminHeader contain Link to Employees",()=>{
        expect(wrapper.find(
            <Link to='/admin/employees'>Employees</Link>
        )).toBeTruthy();
    });

    it("check AdminHeadere contain Link for Orders",()=>{
        expect(wrapper.find(<Link to='/admin/orders'>Orders</Link>)).toBeTruthy();
    });
   
    it("check AdminHeader contain Link for Home",()=>{
        expect(wrapper.find( <Link to='/admin/' className='nav-item'>Home</Link>)).toBeTruthy();
    });
})