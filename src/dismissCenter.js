let subjectMenu = null
let taskMenu = null
let historyMenu = null
let historyDiv = null
let taskFormDiv = null
let subjectFormDiv = null
let overdueDiv = null
export const setMenuRef = (ref) => {
    subjectMenu = ref
}

export const setTaskFormRef = (ref) => {
    taskMenu = ref
}

export const setHistoryFormRef = (ref) => {
    historyMenu = ref
}

export const dismissWindow = (e) => {
  if (subjectMenu) {
    console.log("not susb menu")
    if ((subjectFormDiv) && (!subjectFormDiv.contains(e.target) || ((taskFormDiv) && !taskFormDiv.contains(e.target)))) {
        subjectMenu.closeAddForm()
    }
    if (historyDiv && !historyDiv.contains(e.target)) {
      subjectMenu.closeHistoryScreen()
    }
    if (overdueDiv && !overdueDiv.contains(e.target)) {
      subjectMenu.closeOverdueScreen()
    }

  }
  if (taskMenu) {
    if (taskFormDiv && taskFormDiv.contains(e.target))
      return
    taskMenu.props.closeForm()
  }

}

export const setHistoryDivRef = (node) => {
  historyDiv = node
}

export const setTaskDivRef = (node) => {
  taskFormDiv = node
}

export const setSubjectDivRef = (node) => {
  subjectFormDiv = node
}

export const setOverdueDivRef = (node) => {
  overdueDiv = node
}
