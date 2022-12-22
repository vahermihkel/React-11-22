import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"


function AdminHome() {
  return (
    <div>
      <Link to="/admin/add-product">
        <Button>Lisa toode</Button>
      </Link>
      <Link to="/admin/maintain-products">
        <Button>Halda tooteid</Button>
      </Link>
      <Link to="/admin/maintain-categories">
        <Button>Halda kategooriaid</Button>
      </Link>
      <Link to="/admin/maintain-shops">
        <Button>Halda poode</Button>
      </Link>
    </div>
  )
}

export default AdminHome