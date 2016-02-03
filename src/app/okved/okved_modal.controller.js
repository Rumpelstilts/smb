/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .controller('okved_modal_ctrl', okved_modal_ctrl)
  okved_modal_ctrl.$inject = ['$uibModalInstance', 'user_okveds', '$http']
  /* @ngInject */
  function okved_modal_ctrl ($uibModalInstance, user_okveds, $http) {
    var vm = this
    vm.apply_changes = apply_changes
    vm.cancel = cancel
    vm.check_element = check_element
    vm.fetch_children = fetch_children
    vm.node // main branch
    var selected_okveds = []
    activate()
    // //////////////
    function activate () {
      fetch_node()
    }

    function apply_changes () {
      user_okveds.chosen = selected_okveds
      console.log('changes applied!')
      cancel()
    }

    function cancel () {
      $uibModalInstance.dismiss('cancel')
    }

    //  check/uncheck children after direct click on parent checkbox
    function check_children (el) {
      el.indeterminate = false // after checking element is determinate
      if (el.checked && el.children) {
        for (var i = 0; i < el.children.length; i++) {
          el.children[i].checked = true
          check_children(el.children[i])
        }
      } else if (el.children) {
        for (i = 0; i < el.children.length; i++) {
          el.children[i].checked = false
          check_children(el.children[i])
        }
      }
    }

    function check_element (el) {
      check_children(el)
      check_parent(el)
      collect_selected_okveds()
    }

    function check_parent (el) {
      var checked_children = 0
      var indeterminate_children = 0
      var parent = find_parent(el)
      if (parent) {
        if (!parent.children) return
        var children = parent.children
        // count checked and undeterminate children
        for (var i = 0; i < children.length; i++) {
          if (children[i].checked) {
            checked_children++
          } else if (children[i].indeterminate) {
            indeterminate_children++
          }
        }
        // if node isn't reached yet
        if (document.getElementById(parent.id)) {
          // indeterminate parent checkbox if not all the children are checked or there's indeterminate element
          if ((checked_children > 0 && checked_children < children.length) || indeterminate_children > 0) {
            document.getElementById(parent.id).checked = false
            document.getElementById(parent.id).indeterminate = true
            parent.indeterminate = true
            parent.checked = false
          }
          // uncheck parent checkbox if there's no checked or indeterminate children
          if (checked_children === 0 && indeterminate_children === 0) {
            document.getElementById(parent.id).indeterminate = false
            document.getElementById(parent.id).checked = false
            parent.indeterminate = false
            parent.checked = false
          }
          // check parent checkbox if all children are checked
          if (checked_children === children.length) {
            document.getElementById(parent.id).indeterminate = false
            document.getElementById(parent.id).checked = true
            parent.indeterminate = false
            parent.checked = true
          }
        }
        check_parent(parent) // recursive checking parents
      }
    }

    function collect_selected_okveds () {
      selected_okveds = []
      for (var i = 0; i < vm.node.length; i++) {
        if (vm.node[i].children) {
          push_children(vm.node[i].children)
        }
      }
    }

    // fetch elements children and add some extra data
    function fetch_children (branch) {
      if (!branch.children) {
        $http.get('json/okveds/' + branch.id + '.json').success(function (data) {
          for (var i = 0; i < data.length; i++) {
            data[i].collapsed = true
            data[i].checked = (branch.checked) ? true : false // check for branch.checked to prevent undefined values
            // data[i].parent = branch
            if (!branch.parents) {
              // for node elements
              data[i].parents = [branch.id]
            } else {
              // get grandparents
              data[i].parents = angular.copy(branch.parents)
              data[i].parents.push(branch.id) // add parent
            }
          }
          branch.children = data
        })
      }
      branch.collapsed = !branch.collapsed
    }

    function fetch_node () {
      if (user_okveds.tree.length === 0) {
        $http.get('json/okveds/okved_head.json').success(function (data) {
          user_okveds.tree = data
          vm.node = user_okveds.tree
          for (var i = 0; i < vm.node.length; i++) {
            vm.node[i].collapsed = true
          }
        })
      } else {
        vm.node = user_okveds.tree
      }
    }

    //  search for element parent
    function find_parent (el) {
      // if it's not node
      if (el.parents) {
        return find_child(vm.node, el.parents, 0)
      }
      return
    }

    // recursive find nodes branch with specified id
    // starting from top of node down to leaves
    /*
    	params:
    		el - current element
    		parents = parents of initial element(watch find_parent() func), 
    			e.g. ['1', '1.1', '1.1.5']
    		child_idx - level of branch
    	alghorightm: 
    		should work like ladder
    		goes one level down when branch with specified id is found
    	returns:
    		parent of original element
    */
    function find_child (el, parents, child_idx) {
      for (var i = 0; i < el.length; i++) {
        // if branch id is equal of sought-for
        if (el[i].id === parents[child_idx]) {
          child_idx++
          // if it's last parent
          if (child_idx === parents.length) {
            console.log(el[i].id)
            return el[i]
          } else {
            // if it isn't
            return find_child(el[i].children, parents, child_idx)
          }
        }
      }
    }

    function push_children (children) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].checked) {
          var standart_okved = new TrimmedOkved(children[i])
          selected_okveds.push(standart_okved)
          console.log(selected_okveds)
        } else if (children[i].indeterminate) {
          //  if child is indeterminate, repeat
          push_children(children[i].children)
        }
      }
    }

    // remove extra data from okved
    // leave {id, name, main} props

    function TrimmedOkved (okved) {
      this.id = okved.id
      this.title = okved.title
      this.main = false
    }
  }
})()
