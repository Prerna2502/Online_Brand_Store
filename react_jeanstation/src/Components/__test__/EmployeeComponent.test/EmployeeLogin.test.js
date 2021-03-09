import EmployeeLogin from '../../EmployeeComponents/EmployeeLogin/EmployeeLogin'
import enzyme,{shallow} from 'enzyme'
describe("AdminLogin Component testing",()=>{
    const wrapper=shallow(<EmployeeLogin/>)
    it("check EmployeeLogin contain label for password",()=>{
        expect(wrapper.find(<label htmlFor="exampleInputPassword1"><b>Password</b></label>)).toBeTruthy();
    });

    it("check EmployeeLogin contain Login button",()=>{
        expect(wrapper.find(
            <button type="submit" className="btn btn-primary">LogIn</button>
        )).toBeTruthy();
    });

    it("check EmployeeLogin contain div with login_admin_form class",()=>{
        expect(wrapper.find('form.login_emp__form')).toBeTruthy();
    });
   
    it("check EmployeeLogin contain div with loginForm class",()=>{
        expect(wrapper.find('div.loginForm')).toBeTruthy();
    });
})