from copy import deepcopy
from functools import cached_property
from typing import Mapping

import networkx.convert as convert
from networkx import NetworkXError

from ..classes.coreviews import MultiAdjacencyView
from ..classes.graph import Graph
from ..classes.multidigraph import MultiDiGraph
from ..classes.reportviews import MultiDegreeView, MultiEdgeView

__all__ = ["MultiGraph"]

class MultiGraph(Graph):
    # node_dict_factory = dict    # already assigned in Graph
    # adjlist_outer_dict_factory = dict
    # adjlist_inner_dict_factory = dict
    edge_key_dict_factory = ...
    # edge_attr_dict_factory = dict

    def to_directed_class(self): ...
    def to_undirected_class(self): ...
    def __init__(self, incoming_graph_data=None, multigraph_input=None, **attr): ...
    @cached_property
    def adj(self): ...
    def new_edge_key(self, u, v) -> int: ...
    def add_edge(self, u_for_edge, v_for_edge, key=None, **attr): ...
    def add_edges_from(self, ebunch_to_add, **attr): ...
    def remove_edge(self, u, v, key=None): ...
    def remove_edges_from(self, ebunch): ...
    def has_edge(self, u, v, key=None) -> bool: ...
    @cached_property
    def edges(self) -> MultiEdgeView: ...
    def get_edge_data(self, u, v, key=None, default=None) -> Mapping: ...
    @cached_property
    def degree(self) -> MultiDegreeView | int: ...
    def is_multigraph(self): ...
    def is_directed(self): ...
    def copy(self, as_view=False) -> Graph: ...
    def to_directed(self, as_view=False) -> MultiDiGraph: ...
    def to_undirected(self, as_view=False): ...
    def number_of_edges(self, u=None, v=None) -> int: ...
