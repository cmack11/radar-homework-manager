let subjectMenu = null
let taskMenu = null
export const setMenuRef = (ref) => {
    subjectMenu = ref
}

export const setTaskFormRef = (ref) => {
    taskMenu = ref
}

export const dismissWindow = () => {
  if (subjectMenu) {
    subjectMenu.closeAddForm()
  }
  if (taskMenu) {
    taskMenu.props.closeForm()
  }
}
