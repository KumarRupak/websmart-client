
import './App.css';
import { Login } from './UiComponent/Login';
import { RegisterOrg } from './UiComponent/RegisterOrg';
import { SignUp } from './UiComponent/Signup';
import {Switch,Route} from "react-router-dom";
import { CreditTest } from './UiComponent/CreditTest';
import { auth } from './testing/auth';
import { Home } from './UiComponent/Home';
import {CustomerHome} from './UiComponent/CustomerHome';
import { SetPin } from './UiComponent/SetPin';
import { Profile } from './UiComponent/Profile';
import { MyCards } from './UiComponent/MyCards';
import { FundTransfer, PayEmi } from './UiComponent/PayEmi';
import { TransactionHistory } from './UiComponent/TransactionHistory';
import { CibilCalculator } from './UiComponent/CibilCalculator';
import { SetLimit } from './UiComponent/SetLimit';
import { SmartPay } from './UiComponent/SmartPay';
import { TransferFund } from './UiComponent/TransferFund';
import { AdminHome } from './UiComponent/AdminHome';
import {AdminProfile} from './UiComponent/AdminProfile';
import { PublishCard } from './UiComponent/PublishCard';
import { ErrorNotFound } from './ErrorComponent/ErrorNotFound';







function App() {
  const isLog=false;
  return (
      <>
     { 
     <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signupcus' component={SignUp}/>
        <Route exact path='/signuporg' component={RegisterOrg}/>
        <Route exact path='/auth' component={auth}/>
        <Route exact path='/cushome' component={Home}/>
        <Route exact path='/cusprofile' component={CustomerHome}/>
        <Route exact path='/adminhome' component={AdminHome}/>
        <Route exact path='/credittest' component={CreditTest}/>
        <Route exact path='/generatepin' component={SetPin}/>
        <Route exact path='/cusprof' component={Profile}/>
        <Route exact path='/adminprof' component={AdminProfile}/>
        <Route exact path='/mycards' component={MyCards}/>
        <Route exact path='/payemi' component={PayEmi}/>
        <Route exact path='/transaction' component={TransactionHistory}/>
        <Route exact path='/cibil' component={CibilCalculator}/>
        <Route exact path='/limit' component={SetLimit}/>
        <Route exact path='/smartpay' component={SmartPay}/>
        <Route exact path='/transfer' component={TransferFund}/>
        <Route component={ErrorNotFound}/>
      </Switch>
     }
      </>
  );
}

export default App;
