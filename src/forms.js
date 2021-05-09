//Внимание! self в данном случае явзяется главным стором (appStore)
import { CategoryFormConfig } from "forms/CategoryForm.config";
import { ClientFormConfig } from "forms/ClientForm.config";
import { GroupFormConfig } from "forms/GroupForm.config";
import { IngridientFormConfig } from "forms/IngridientForm.config";
import { LoginFormConfig } from "forms/LoginForm.config";
import { ModificatorCategoryFormConfig } from "forms/ModificatorCategoryForm.config";
import { ModificatorFormConfig } from "forms/ModificatorForm.config";
import { UserFormConfig } from "forms/UserForm.config";
import { ProductFormConfig } from "forms/ProductForm.config";
import { RestaurantFormConfig } from "forms/RestaurantForm.config";
import { PermissionFormConfig } from "forms/PermissionForm.config";
/* PLOP_IMPORT_FORM_CONFIG */
import { OpinionFormConfig } from "forms/OpinionForm.config";
import { ClientGroupFormConfig } from "forms/ClientGroupForm.config";
import { IngridientCategoryFormConfig } from "forms/IngridientCategoryForm.config";
import { OrderFormConfig } from "forms/OrderForm.config";
import { ZoneFormConfig } from "forms/ZoneForm.config";

export default self => ({
  /* PLOP_IMPORT_FORM */
  opinionForm: OpinionFormConfig(self),
  client_groupForm: ClientGroupFormConfig(self),
  ingridient_categoryForm: IngridientCategoryFormConfig(self),
  orderForm: OrderFormConfig(self),
  zoneForm: ZoneFormConfig(self),
  loginForm: LoginFormConfig(self),
  clientForm: ClientFormConfig(self),
  categoryForm: CategoryFormConfig(self),
  modificator_categoryForm: ModificatorCategoryFormConfig(self),
  ingridientForm: IngridientFormConfig(self),
  userForm: UserFormConfig(self),
  productForm: ProductFormConfig(self),
  restaurantForm: RestaurantFormConfig(self),
  modificatorForm: ModificatorFormConfig(self),
  groupForm: GroupFormConfig(self),
  permissionForm: PermissionFormConfig(self)
});
