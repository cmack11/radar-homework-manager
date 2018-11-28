let subjectMenu = null
let taskMenu = null
let historyMenu = null
export const setMenuRef = (ref) => {
    subjectMenu = ref
}

export const setTaskFormRef = (ref) => {
    taskMenu = ref
}

export const setHistoryFormRef = (ref) => {
    historyMenu = ref
}

export const dismissWindow = () => {
  if (subjectMenu) {
    subjectMenu.closeAddForm()
    subjectMenu.closeHistoryScreen()
    subjectMenu.closeOverdueScreen()
  }
  if (taskMenu) {
    taskMenu.props.closeForm()
  }

}
