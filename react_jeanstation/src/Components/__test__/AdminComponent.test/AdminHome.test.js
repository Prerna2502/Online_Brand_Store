import AdminHome from '../../AdminComponents/AdminHome/AdminHome'
import enzyme,{shallow} from 'enzyme'
import { Link } from 'react-router-dom'
describe("AdminHome Component testing",()=>{
    const wrapper=shallow(<AdminHome/>)
    it("check AdminHome contain h1 with caption Welcome to Jean-Station Admin Portal.",()=>{
        expect(wrapper.find(<h1 className="cover-heading">Welcome to Jean-Station Admin Portal.</h1>)).toBeTruthy();
    });

    it("check AdminHome contain Link to LogIn",()=>{
        expect(wrapper.find(
            <Link to='/admin/log_in' className='btn btn-lg btn-secondary'>Log In</Link>
        )).toBeTruthy();
    });

    it("check AdminHome contain p tag",()=>{
        expect(wrapper.find('p')).toBeTruthy();
    });
   
    it("check AdminLogin contain main with inner class",()=>{
        expect(wrapper.find('main.inner')).toBeTruthy();
    });
})